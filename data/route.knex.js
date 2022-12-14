const {knex} = require("./../database2");

exports.createRoute = async (station1, station2) => {
    return await knex.raw("CALL insertMain(?,?)", [station1, station2]);
}

exports.fetchRoute = async () => {
    const query = knex("stack_Compare");
    return await query;
}
