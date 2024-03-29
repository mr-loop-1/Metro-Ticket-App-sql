const express = require('express');
const {ticketController} = require('./../controllers')

const router = express.Router();

router.get("/:ticketId", ticketController.getTicket);
router.post("", ticketController.checkTicket);

module.exports = router;