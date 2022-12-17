/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    const migration = await knex.schema.createTable(
        "Hybrid",
        function (table) {
            table.integer("Hybrid_ID").primary();
            table.integer("Star_Town").nullable().index();
            table.integer("Shipyard").nullable().index();
            table.integer("Airport").nullable().index();
            table.integer("Food_Street").nullable().index();
        }
    );
    return migration;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("Hybrid");
};
