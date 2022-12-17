/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  return knex.raw(`
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
  `)
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.raw("DROP PROCEDURE IF EXISTS insertMain;")
};
