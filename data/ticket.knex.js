const { knex } = require("./../database2");

exports.getTicket = async (ticketId) => {
    const query = knex("details");

    query.where("Ticket", ticketId);
    query.first();

    return await query;
}