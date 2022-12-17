const { onUpdateTrigger, timestamps } = require("../utils");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    const migration = await knex.schema.createTable(
        "details",
        function (table) {
            table.integer("Ticket").primary();
            table.string("Fname");
            table.string("Lname");
            table.string("Phone");
            table.date("Booking");
            table.string("starter");
            table.string("dest");
            timestamps(knex, table);
        }
    );
    await knex.raw(onUpdateTrigger("details"));
    return migration;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("details");
};
