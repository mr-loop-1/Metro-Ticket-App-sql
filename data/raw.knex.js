const { knex } = require("./../database2");

exports.query = async (queryString) => {
    knex.raw(queryString);
    return;
}