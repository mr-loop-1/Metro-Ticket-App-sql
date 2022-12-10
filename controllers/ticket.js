

exports.getTicket = (req, res, next) => {

}

exports.checkTicket = (req, res, next) => {
    const ticket = req.body.ticket;
    res.redirect('/users/confirm');
}

const db = require('../database');
let variabled4;

router.post("/confirm", (req, res) => {
    
});

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