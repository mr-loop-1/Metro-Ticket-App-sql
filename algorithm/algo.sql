drop table IF EXISTS stack_Compare;
drop table IF EXISTS lastNode;
drop table IF EXISTS lastNodeTracker;

CREATE TABLE stack_Compare (i INT NOT NULL AUTO_INCREMENT, Station VARCHAR(20), PRIMARY KEY (i), Color VARCHAR(20));
CREATE TABLE lastNode (Last_Station_ID INT, I INT);
CREATE TABLE lastNodeTracker (message VARCHAR(20));

AlTER table lastNode ADD PRimary key (I);
INSERT INTO lastNode VALUES (1, 1);
Drop trigger IF EXISTS lastAdded;
DROP TRIGGER IF EXISTS lastAdd;

DELIMITER $$

CREATE TRIGGER lastAdded AFTER INSERT
ON stack_Compare FOR EACH ROW
BEGIN
	UPDATE lastNode SET Last_Station_ID = (SELECT Station.Station_ID FROM Station WHERE New.Station = Station.Name LIMIT 1) WHERE I = 1;
END $$

CREATE TRIGGER lastAdd AFTER INSERT
ON stack_Compare FOR EACH ROW
BEGIN
	INSERT INTO lastNodeTracker SELECT Name FROM Station WHERE Station_ID = (SELECT Last_Station_ID FROM lastNode ORDER BY i DESC LIMIT 1);
END $$


DELIMITER ;

DROP PROCEDURE IF EXISTS insertStation;
DROP PROCEDURE IF EXISTS insertStationPrev;
DROP PROCEDURE IF EXISTS insertMain;
DROP PROCEDURE IF EXISTS insertFromJunction;

DELIMITER $$

SET max_sp_recursion_depth=100;
CREATE PROCEDURE insertStation (insertstationID INT, starter VARCHAR(20), destination VARCHAR(20)) 
this_procedure:BEGIN

DECLARE nextNode INT DEFAULT NULL;
INSERT INTO stack_Compare (Station, Color)
	SELECT Name,Color from Station WHERE Station_ID = insertstationID LIMIT 1;

IF insertStationID IN (SELECT * FROM (SELECT Station_ID FROM Station WHERE Name = destination LIMIT 1) AS bypass2)
	THEN LEAVE this_procedure;
END IF;
SET nextNode = (SELECT Next_Station FROM Station WHERE Station_ID = insertstationID LIMIT 1);
IF nextNode IS NULL
	THEN LEAVE this_procedure;
END IF;
IF nextNode = -1
	THEN LEAVE this_procedure;
ELSE CALL insertStation (nextNode, starter, destination);
END IF;
END
$$
SET max_sp_recursion_depth=100;
CREATE PROCEDURE insertStationPrev (insertstationID INT, starter VARCHAR(20), destination VARCHAR(20)) 
this_procedure4:BEGIN

DECLARE nextNode INT DEFAULT NULL;
INSERT INTO stack_Compare (Station, Color)
	SELECT Name,Color from Station WHERE Station_ID = insertstationID LIMIT 1;

IF insertStationID IN (SELECT * FROM (SELECT Station_ID FROM Station WHERE Name = destination LIMIT 1) AS bypass2)
	THEN LEAVE this_procedure4;
END IF;
SET nextNode = (SELECT Prev_Station FROM Station WHERE Station_ID = insertstationID LIMIT 1);
IF nextNode IS NULL
	THEN LEAVE this_procedure4;
END IF;
IF nextNode = -1
	THEN LEAVE this_procedure4;
ELSE CALL insertStationPrev (nextNode, starter, destination);
END IF;
END
$$



CREATE PROCEDURE insertMain (starter VARCHAR(20), destination VARCHAR(20))
this_procedure2:BEGIN
DECLARE id INT DEFAULT NULL;
SET id = (SELECT Station_ID FROM Station WHERE Name = starter);

CALL insertStationPrev(id, starter, destination);
IF (SELECT Last_Station_ID FROM lastNode LIMIT 1) = (SELECT Station_ID FROM Station WHERE Name = destination LIMIT 1)
	THEN LEAVE this_procedure2;
ELSE TRUNCATE stack_Compare;
	CALL insertStation(id, starter, destination);
END IF;

IF (SELECT Last_Station_ID FROM lastNode LIMIT 1) = (SELECT Station_ID FROM Station WHERE Name = destination LIMIT 1)
	THEN LEAVE this_procedure2;
ELSE CALL insertFromJunction(starter, destination);
END IF;

END;
$$

SET max_sp_recursion_depth=100;
CREATE PROCEDURE insertFromJunction (starter VARCHAR(20), destination VARCHAR(20))
this_procedure3:BEGIN
DECLARE adjacentID INT DEFAULT NULL;

SET @junction = (SELECT Station.Name FROM Station, lastNode WHERE lastNode.Last_Station_ID = Station.Station_ID);
SET @iteration = 1;

IF @junction = 'Shipyard'
	THEN IF destination IN (SELECT Airport FROM half) 
			THEN SET @iteration = 2;
		END IF;
ELSEIF @junction = 'Airport'
	THEN IF destination IN (SELECT Shipyard FROM half) 
			THEN SET @iteration = 2;
		END IF;
END IF;

loop2: REPEAT

SET adjacentID = (SELECT CASE @junction 
							WHEN 'Food_Street' THEN Food_Street 
                            WHEN 'Shipyard' THEN Shipyard
                            WHEN 'Airport' THEN Airport
                            WHEN 'Star_Town' THEN Star_Town
                            END AS selectedColumn from Hybrid WHERE Hybrid_ID = @iteration LIMIT 1);

IF (SELECT Last_Station_ID FROM lastNode WHERE I = 1 LIMIT 1) = (SELECT Station_ID FROM Station WHERE Name = destination LIMIT 1)
	THEN LEAVE loop2;
ELSEIF adjacentID IN (SELECT Station_ID FROM Station, stack_Compare WHERE stack_Compare.Station = Station.Name)
	THEN SET @iteration = @iteration +1 -1;
ELSEIF @junction = (SELECT Name FROM Station WHERE Station_ID = (SELECT Next_Station FROM Station WHERE Station_ID = adjacentID LIMIT 1) LIMIT 1)
	THEN CALL insertStationPrev (adjacentID, starter, destination);
    IF (SELECT Last_Station_ID FROM lastNode WHERE I = 1 LIMIT 1) = (SELECT Station_ID FROM Station WHERE Name = destination LIMIT 1)
		THEN LEAVE loop2;
	ELSEIF (SELECT Prev_Station FROM Station,lastNode WHERE Last_Station_ID = Station_ID) IS NULL
		THEN set @lim = (SELECT COUNT(i) FROM stack_Compare WHERE i>(SELECT i FROM stack_Compare where Station = @junction));
		prepare stmt FROM 'DELETE FROM stack_Compare ORDER BY i desc LIMIT ?';
        execute stmt using @lim;
		DEALLOCATE PREPARE stmt;
	END IF;
ELSE CALL insertStation (adjacentID, starter, destination);
IF (SELECT Last_Station_ID FROM lastNode WHERE I = 1 LIMIT 1) = (SELECT Station_ID FROM Station WHERE Name = destination LIMIT 1)
		THEN LEAVE loop2;
	ELSEIF (SELECT Next_Station FROM Station,lastNode WHERE Last_Station_ID = Station_ID) IS NULL
		THEN set @lim = (SELECT COUNT(i) FROM stack_Compare WHERE i>(SELECT i FROM stack_Compare where Station = @junction));
		prepare stmt FROM 'DELETE FROM stack_Compare ORDER BY i desc LIMIT ?';
        execute stmt using @lim;
		DEALLOCATE PREPARE stmt;
	END IF;
END IF;

IF (SELECT Next_Station FROM Station, lastNode WHERE Last_Station_ID = Station_ID) = -1
	THEN IF @junction <> (SELECT Name FROM Station, lastNode WHERE Last_Station_ID = Station_ID)
		THEN CALL insertFromJunction (starter, destination);
	END IF;
END IF;

SET @iteration := @iteration + 1;
UNTIL adjacentID IS NULL 
END REPEAT loop2;
END;
$$

DELIMITER ;
