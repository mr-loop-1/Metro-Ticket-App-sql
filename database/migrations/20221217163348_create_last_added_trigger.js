const { onUpdateTrigger, timestamps } = require("../utils");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    return knex.raw(`
    CREATE TRIGGER lastAdded AFTER INSERT
    ON stack_Compare FOR EACH ROW
    BEGIN
	    UPDATE lastNode SET Last_Station_ID = (SELECT Station.Station_ID FROM Station WHERE New.Station = Station.Name LIMIT 1) WHERE I = 1;
    END
    `)
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.raw("DROP TRIGGER IF EXISTS lastAdded;");
};
