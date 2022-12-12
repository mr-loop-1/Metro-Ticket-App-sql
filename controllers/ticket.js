const {URLSearchParams} = require('url')
const {ticketData} = require('./../data')

exports.getTicket = async (req, res, next) => {
    const ticketId = req.query.ticketId;

    if(!ticketId) {
        throw new Error;
    }

    const ticketDetails = await ticketData.getTicket(ticketId);

    console.log("🚀 ~ file: ticket.js:7 ~ exports.getTicket= ~ ticketDetails:", ticketDetails)
    
    return res.render('confirm/confirm', {Ticket: ticketDetails});
}

// Now I see this post request can even be omitted. I just didn't want to interfere with original logic
exports.checkTicket = (req, res, next) => {
    const ticketId = req.body.ticket;
    const query = new URLSearchParams({
        ticketId
    })
    return res.redirect('/ticket?'+query);
}