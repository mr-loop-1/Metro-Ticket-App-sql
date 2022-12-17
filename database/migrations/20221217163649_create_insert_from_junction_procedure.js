/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw("SET max_sp_recursion_depth=100;")
  return knex.raw(`
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
  `)
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.raw("DROP PROCEDURE IF EXISTS insertFromJunction;")
};
