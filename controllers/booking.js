const { bookingTasks } = require('../tasks');
const {rawData, routeData} = require('./../data')

exports.createRoute = async (req, res, next) => {

    const {station1, station2} = req.body;
    if(!station1 || !station2) {
        throw new Error;
    }
    
    rawData.query("TRUNCATE stack_Compare");
    rawData.query("TRUNCATE lastNodeTracker");
    rawData.query("SET max_sp_recursion_depth=100");

    await routeData.createRoute(station1, station2);

    const query = new URLSearchParams({
        station1,
        station2
    })

    res.redirect('/booking/stations?'+query)
}

exports.getRoute = async ( req, res, next) => {
    const {station1, station2} = req.query;
    if(!station1 || !station2) {
        throw new Error;
    }

    const route = await routeData.getRoute();
    rawData.query("TRUNCATE stack_Compare");
    rawData.query("TRUNCATE lastNodeTracker");

    const {gate1, gate2} = bookingTasks.randomGates();
    const {time, price} = bookingTasks.getTimeAndPrice(route.length);

    res.render("booking/details", {
        title: "User Listt",
        userdataa: route,
        timed: time,
        priced: price,
        enter: gate1,
        exit: gate2,
    });
}