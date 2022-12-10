const express = require('express');
const router = express.Router();
const db = require('../database');

let variabled4;

router.post("/confirm", (req, res) => {
    variabled4 = req.body.ticket;
    res.redirect('/users/confirm');
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

router.post("/login", (req,res) => {
    if (req.body.username=="Tommy Vercetti" && req.body.pass=="thisismyaccount") 
        res.redirect('/users/login');
    res.redirect("/users/metro");
});

module.exports = router;