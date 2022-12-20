const { bookingTasks } = require('../tasks');
const {rawData, routeData, ticketData} = require('./../data')

exports.createRoute = async (req, res, next) => {

    const {selectpicker: station1, selectpicker2: station2} = req.body;
    
    await rawData.query("TRUNCATE stack_Compare");
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
        return res.render("bookings/route", {userdataa: []});
    }

    const route = await routeData.fetchRoute();

    rawData.query("TRUNCATE stack_Compare");

    const {gate1, gate2} = bookingTasks.randomGates();
    const {time, price} = bookingTasks.getTimeAndPrice(route.length);

    const query = new URLSearchParams({
        start: station1,
        end: station2,
        price: price
    })

    return res.render("bookings/route", {
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

    res.render('bookings/details', {
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
    const id = (
        new Date().valueOf() + Math.floor(Math.random() * 10000)
    ).toString();
    
    const inputs = {
        fname, lname, phone, date, id, start, end
    }
    await ticketData.createTicket(inputs);
    const query = new URLSearchParams({...inputs, price})

    res.redirect('/booking/details?'+query);
}