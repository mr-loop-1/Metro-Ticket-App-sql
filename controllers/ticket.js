const {URLSearchParams} = require('url')
const {ticketData} = require('./../data')

exports.getTicket = async (req, res, next) => {
    const ticketId = req.params.ticketId;
    let ticketDetails;
    if(ticketId) {
        ticketDetails = await ticketData.getTicket(ticketId);    
    }
    return res.render('tickets/ticket', {Ticket: ticketDetails});
}

// Now I see this post request can even be omitted. I just didn't want to interfere with original logic
exports.checkTicket = (req, res, next) => {
    const ticketId = req.body.ticket.toString() || "invalid";
    const query = new URLSearchParams({
        ticketId
    })
    return res.redirect(`/ticket/${ticketId}`);
}