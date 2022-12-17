/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {

    await knex.raw("SET max_sp_recursion_depth=100;")

  return knex.raw(`
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
    END;
  `)
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.raw("DROP PROCEDURE IF EXISTS insertStationPrev;")
};
