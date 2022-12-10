const {URLSearchParams} = require('url')

exports.getTicket = (req, res, next) => {
    db.query(
        "SELECT Ticket,Fname,Lname,Phone,DATE_FORMAT(Booking,'%Y-%m-%d') AS Booking,starter,dest FROM details WHERE Ticket=?",
        [variabled4],
        (err, results) => {
            if (err) throw err;
            res.render("confirm/confirm", { title: "ticket info", Ticket: results[0] });
        }
    );
}

// Now I see this post request can even be omitted. I just didn't want to interfere with original logic
exports.checkTicket = (req, res, next) => {
    const ticketId = req.body.ticket;
    const query = new URLSearchParams({
        ticketId
    })
    res.redirect('/users/confirm'+query);
}

router.get("/confirm", (req,res) => {
    db.query(
        "SELECT Ticket,Fname,Lname,Phone,DATE_FORMAT(Booking,'%Y-%m-%d') AS Booking,starter,dest FROM details WHERE Ticket=?",
        [variabled4],
        (err, results) => {
            if (err) throw err;
            res.render("confirm/confirm", { title: "ticket info", Ticket: results[0] });
        }
    );
});