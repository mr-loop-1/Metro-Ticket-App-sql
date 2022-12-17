const { onUpdateTrigger, timestamps } = require("../utils");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    const migration = await knex.schema.createTable(
        "stack_Compare",
        function (table) {
            table.increments("i").primary();
            table.string("Station").index();
            table.string("Color");
            timestamps(knex, table);
        }
    );
    await knex.raw(onUpdateTrigger("stack_Compare"));
    return migration;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("stack_Compare");
};
