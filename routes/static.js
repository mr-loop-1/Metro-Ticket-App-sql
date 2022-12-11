const { Router } = require('express');
const router = Router();


router.get("/about", (req,res) => {
    res.render("filler/about");
});
router.get("/login_admin", (req,res) => {
    res.render("login_admin");
});
router.get("/contact", (req, res) => {
    res.render('filler/contact');
});
router.get('/team', (req, res) => {
    res.render('filler/team');
});  
router.get('/portfolio', (req, res) => {
    res.render('filler/portfolio');
});
router.get('/networkmap', (req, res) => {
    res.render('filler/networkmap');
});
router.get('/', (req, res) => {
    res.render("metro");
});


router.post("/login", (req,res) => {
    if (req.body.username=="Tommy Vercetti" && req.body.pass=="thisismyaccount") 
        res.redirect('/users/login');
    res.redirect("/users/metro");
});

module.exports = router;