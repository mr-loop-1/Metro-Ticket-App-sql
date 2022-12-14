const { bookingTasks } = require('../tasks');
const {rawData, routeData, ticketData} = require('./../data')

exports.createRoute = async (req, res, next) => {

    const {selectpicker: station1, selectpicker2: station2} = req.body;
    if(!station1 || !station2) {
        throw new Error;
    }
    
    await rawData.query("TRUNCATE stack_Compare");
    await rawData.query("TRUNCATE lastNodeTracker");
    await rawData.query("SET max_sp_recursion_depth=100");

    await routeData.createRoute(station1, station2);

    const query = new URLSearchParams({
        station1,
        station2
    })

    return res.redirect('/booking/route?'+query)
}

exports.getRoute = async ( req, res, next) => {
    const {station1, station2} = req.query;
    if(!station1 || !station2) {
        throw new Error;
    }

    const route = await routeData.fetchRoute();

    rawData.query("TRUNCATE stack_Compare");
    rawData.query("TRUNCATE lastNodeTracker");

    if(!route.length) {
        throw new Error; //? or simply display alternate in view
    }

    const {gate1, gate2} = bookingTasks.randomGates();
    const {time, price} = bookingTasks.getTimeAndPrice(route.length);

    const query = new URLSearchParams({
        start: station1,
        end: station2,
        price: price
    })

    return res.render("booking/details", {
        userdataa: route,
        timed: time,
        priced: price,
        enter: gate1,
        exit: gate2,
        query
    });
}

exports.showDetails = (req, res, next) => {
    const {start, end, price, id, fname, lname} = req.query;

    if(!start || !end) {
        throw new Error;
    }

    res.render('booking/guest', {
        priced: price,
        start,
        end,
        id,
        fname,
        lname,
    })
}

exports.registerTicket = async (req, res, next) => {

    const {
        fname, lname, phone, myDate: date, start, end, price
    } = req.body;

    id = Math.floor((Math.random() * 10000000) + 1);

    const inputs = {
        fname, lname, phone, date, id, start, end
    }

    await ticketData.createTicket(inputs);

    const query = new URLSearchParams({...inputs, price})

    res.redirect('/booking/details?'+query);

}