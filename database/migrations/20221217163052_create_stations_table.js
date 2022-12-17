/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    const migration = await knex.schema.createTable(
        "Station",
        function (table) {
            table.bigIncrements("Station_ID").primary();
            table.string("Name").index();
            table.bigInteger("Prev_Station").nullable().index();
            table.bigInteger("Next_Station").nullable().index();
            table.string("Color").nullable().index();
            timestamps(knex, table);
        }
    );
    await knex.raw(onUpdateTrigger("Station"));
    return migration;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("Station");
};
