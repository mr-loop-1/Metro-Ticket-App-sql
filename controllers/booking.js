const {rawData} = require('./../data')

exports.createRoute = (req, res, next) => {
    const {station1, station2} = req.query;
    if(!station1 || !station2) {
        throw new Error;
    }
    rawData.query("TRUNCATE stack_Compare");
    rawData.query("TRUNCATE lastNodeTracker");
    rawData.query("SET max_sp_recursion_depth=100");
}