var express = require('express');
var router = express.Router();
var db = require('../database');

var variabled;
var variabled2;
var time;
var price;

router.get('/metro', function(req, res, next) {
    res.render("metro");
});
router.get("/about", function(req,res){
    res.render("about");
});
router.get("/planner", function(req,res){
    res.render("planner");
});
router.get("/login_admin", function(req,res){
    res.render("login_admin");
  });
  router.get("/contact", function(req, res){
    res.render('contact');
  });

  router.get('/team', function(req, res){
    res.render('team');
  });
  
  router.get('/portfolio', function(req, res){
    res.render('portfolio');
  });
  
  router.get('/networkmap', function(req, res){
    res.render('networkmap');
  });
  

router.post("/details", function(req, res, next){
    variabled=req.body.selectpicker;
    variabled2=req.body.selectpicker2;
    res.redirect('/users/details');
});

var gate1;
var gate2;
router.get('/details', function(req, res, next) {
    db.query("TRUNCATE stack_Compare");
    db.query("TRUNCATE lastNodeTracker");

    db.query("SET max_sp_recursion_depth=100");
    gate1 = Math.floor((Math.random() * 4)+1);
    gate2 = Math.floor((Math.random() * 4)+6);
    
    db.query("CALL insertMain(?,?)",[variabled,variabled2],function (err, results, fields){
        if (err) throw err;
    });

    db.query("SELECT COUNT(Station) AS aaa FROM stack_Compare", function(err, results, fields){
        if (err) throw err;
        time = (10 * results[0].aaa)  - 5;
        price = (results[0].aaa*10);
    });

    db.query("SELECT * FROM stack_Compare", function (err, results, fields) {
        if (err) throw err;
        console.log(results);
        res.render('details', { title: 'User Listt', userdataa: results, timed: time, priced: price, enter: gate1, exit: gate2});
  });
});







var variabled3;

router.get("/guest", function(req,res){
    console.log(variabled3);
    res.render("guest", {title: 'mains', start: variabled, end: variabled2, priced: price, id: variabled3, fname:fname, lname:lname});
    variabled3 = undefined;
});

var fname;
var lname;
var phone;
var date;


router.post("/status", function(req, res){
    fname=req.body.fname;
    lname=req.body.lname;
    phone=req.body.phone;
    date=req.body.myDate;
    console.log(variabled3);
    variabled3 = Math.floor((Math.random() * 10000000) + 1);
    console.log(variabled3);
    db.query("Insert INTO details VALUES (?,?,?,?,?,?,?)",[variabled3,fname,lname,phone,date, variabled, variabled2],function (err, results, fields){
        if (err) throw err;
    });
    res.redirect('/users/guest');
    
});




router.get("/status", function(req,res){
    
    res.render("status", {title: 'number', name1: fname, name2: lname, id: variabled3});
});
module.exports = router;















var variabled4;

router.post("/confirm", function(req, res){
    variabled4 = req.body.ticket;
    res.redirect('/users/confirm');
});

router.get("/confirm",function(req,res){
    db.query("SELECT Ticket,Fname,Lname,Phone,DATE_FORMAT(Booking,\'%Y-%m-%d\') AS Booking,starter,dest FROM details WHERE Ticket=?",[variabled4],function(err, results, fields){
        if (err) throw err;
        console.log(results[0]);
        res.render('confirm', { title: 'ticket info', Ticket: results[0]});
    });
});

router.post("/login",function(req,res){
    if (req.body.username=="Tommy Vercetti" && req.body.pass=="thisismyaccount") res.redirect('/users/login');
    res.redirect("/users/metro");
});

router.get("/login", function(req, res){
    res.render('login');
});
