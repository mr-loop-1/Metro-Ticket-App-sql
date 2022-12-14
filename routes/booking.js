const { Router } = require('express');
const { bookingController } = require('./../controllers')


const router = Router();

router.get('/stations', (req, res, next) => {
    return res.render("bookings/station");
});  // maps to planner
router.get('/route', bookingController.getRoute); // maps to details
router.get('/details', bookingController.showDetails) // maps to guest

router.post('/stations', bookingController.createRoute);
router.post('/ticket', bookingController.registerTicket);

module.exports = router;