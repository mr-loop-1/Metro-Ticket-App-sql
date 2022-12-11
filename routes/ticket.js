const express = require('express');
const {ticketController} = require('./../controllers')

const router = express.Router();

router.get("", ticketController.getTicket);
router.post("", ticketController.checkTicket);

router.post("/login", (req,res) => {
    if (req.body.username=="Tommy Vercetti" && req.body.pass=="thisismyaccount") 
        res.redirect('/users/login');
    res.redirect("/users/metro");
});

module.exports = router;