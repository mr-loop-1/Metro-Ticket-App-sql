const { knex } = require("./../database2");

exports.query = async (queryString) => {
    await knex.raw(queryString);
    return;
}