const { Router } = require('express');
const { bookingController } = require('./../controllers')


const router = Router();

router.get('/stations', (req, res, next) => {
    return res.render("booking/planner");
});  // maps to planner
router.get('./route', bookingController.getRoute); // maps to details
router.get('./details', bookingController.showDetails) // maps to guest

router.post('./stations', bookingController.createRoute);
router.post('./details', bookingController.registerTicket);


// router.post("/details", (req, res) => {
//     variabled=req.body.selectpicker;
//     variabled2=req.body.selectpicker2;
//     res.redirect('/users/details');
// });

// let gate1, gate2;

// router.get('/details', (req, res) => {
//     db.query("TRUNCATE stack_Compare");
//     db.query("TRUNCATE lastNodeTracker");
//     db.query("SET max_sp_recursion_depth=100");

//     gate1 = Math.floor((Math.random() * 4)+1);
//     gate2 = Math.floor((Math.random() * 4)+6);
    
//     db.query("CALL insertMain(?,?)",[variabled,variabled2], err => {
//         if (err) throw err;
//     });

//     db.query("SELECT COUNT(Station) AS freq FROM stack_Compare", (err, results) => {
//         if (err) throw err;
//         time = (10 * results[0].freq)  - 5;
//         price = (results[0].freq*10);
//     });

//     db.query("SELECT * FROM stack_Compare", (err, results) => {
//         if (err) throw err;
//         res.render("booking/details", {
//             title: "User Listt",
//             userdataa: results,
//             timed: time,
//             priced: price,
//             enter: gate1,
//             exit: gate2,
//         });
//     });

// });


// let variabled3;

// router.get("/guest", (req,res) => {
//     res.render("booking/guest", {
//         title: "mains",
//         start: variabled,
//         end: variabled2,
//         priced: price,
//         id: variabled3,
//         fname: fname,
//         lname: lname,
//     });
//     variabled3 = undefined;
// });

// let fname, lname, phone, date;


// router.post("/status", (req, res) => {
//     fname=req.body.fname;
//     lname=req.body.lname;
//     phone=req.body.phone;
//     date=req.body.myDate;

//     variabled3 = Math.floor((Math.random() * 10000000) + 1);

//     db.query(
//         "Insert INTO details VALUES (?,?,?,?,?,?,?)",
//         [variabled3, fname, lname, phone, date, variabled, variabled2],
//         (err) => {
//             if (err) throw err;
//         }
//     );

//     res.redirect('/users/guest');
// });

module.exports = router;