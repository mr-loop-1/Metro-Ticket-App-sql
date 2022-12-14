const { knex } = require("./../database2");

exports.query = async (queryString) => {
    return await knex.raw(queryString);
}