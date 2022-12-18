exports.randomGates = () => ({
    gate1: Math.floor((Math.random() * 4)+1),
    gate2: Math.floor((Math.random() * 4)+6)
})

exports.getTimeAndPrice = (stationCount) => ({
    time: (10 * stationCount)  - 5,
    price: (stationCount*10)
})