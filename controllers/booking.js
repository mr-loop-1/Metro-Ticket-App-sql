const { bookingTasks } = require('../tasks');
const {rawData, routeData} = require('./../data')

exports.createRoute = async (req, res, next) => {

    const {selectpicker: station1, selectpicker2: station2} = req.body;
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

    return res.redirect('/booking/stations?'+query)
}

exports.getRoute = async ( req, res, next) => {
    const {station1, station2} = req.query;
    if(!station1 || !station2) {
        throw new Error;
    }

    const route = await routeData.getRoute();

    rawData.query("TRUNCATE stack_Compare");
    rawData.query("TRUNCATE lastNodeTracker");

    if(route.length) {
        throw new Error; //? or simply display alternate in view
    }

    const {gate1, gate2} = bookingTasks.randomGates();
    const {time, price} = bookingTasks.getTimeAndPrice(route.length);

    const query = new URLSearchParams({
        station1,
        station2,
        price
    })

    return res.render("booking/details", {
        userdataa: route,
        timed: time,
        priced: price,
        enter: gate1,
        exit: gate2,
        ...query
    });
}

exports.showDetails = (req, res, next) => {
    const {start, end, price} = req.query;

    if(!start || !end) {
        throw new Error;
    }

    res.render('booking/guest', {
        title: "mains",
        start: variabled,
        end: variabled2,
        priced: price,
        id: variabled3,
        fname: fname,
        lname: lname,
    })
}