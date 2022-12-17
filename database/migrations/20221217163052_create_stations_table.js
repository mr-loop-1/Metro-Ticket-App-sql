/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    const migration = await knex.schema.createTable(
        "Station",
        function (table) {
            table.integer("Station_ID").primary();
            table.string("Name").index();
            table.integer("Prev_Station").nullable().index();
            table.integer("Next_Station").nullable().index();
            table.string("Color");
        }
    );
    return migration;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("Station");
};
