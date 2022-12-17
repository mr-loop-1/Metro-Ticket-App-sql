const { onUpdateTrigger, timestamps } = require("../utils");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    const migration = await knex.schema.createTable(
        "lastNode",
        function (table) {
            table.integer("I").primary();
            table.integer("Last_Station_ID").index();
            timestamps(knex, table);
        }
    );
    await knex.raw(onUpdateTrigger("lastNode"));
    await knex("lastNode").insert({I: 1, "Last_Station_ID": 1});
    return migration;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("lastNode");
};
