const knex = require("./../database2");

exports.createRoute = async (station1, station2) => {
    await knex.raw("CALL insertMain(?,?)", [station1, station2]);
    return;
}

exports.fetchRoute = async () => {
    const query = knex("stack_compare");
    return await query;
}
