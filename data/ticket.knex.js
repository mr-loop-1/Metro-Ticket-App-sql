const { knex } = require("./../database2");

exports.getTicket = async (ticketId) => {
    const query = knex("details");

    query.where("Ticket", ticketId);
    query.first();

    return await query;
}

exports.createTicket = async (inputs) => {
    const query = knex("details");

    query.insert({
        Ticket: inputs.id,
        Fname: inputs.fname,
        Lname: inputs.lname,
        Phone: inputs.phone,
        Booking: inputs.date,
        starter: inputs.start,
        dest: inputs.dest
    })
    .onConflict()
    .ignore();

    return await query;
}