const {rawData, routeData} = require('./../data')

exports.createRoute = async (req, res, next) => {
    
    rawData.query("TRUNCATE stack_Compare");
    rawData.query("TRUNCATE lastNodeTracker");
    rawData.query("SET max_sp_recursion_depth=100");

    await routeData.createRoute(station1, station2);

    res.redirect('/booking/stations')
}

exports.getRoute = async ( req, res, next) => {
    const {station1, station2} = req.query;
    if(!station1 || !station2) {
        throw new Error;
    }
}