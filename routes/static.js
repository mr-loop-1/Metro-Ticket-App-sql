const { Router } = require('express');
const router = Router();

router.get("/about", (req,res) => {
    return res.render("static/about");
});
router.get("/login_admin", (req,res) => {
    return res.render("login_admin");
});
router.get("/contact", (req, res) => {
    return res.render('static/contact');
});
router.get('/team', (req, res) => {
    return res.render('static/team');
});  
router.get('/portfolio', (req, res) => {
    return res.render('static/portfolio');
});
router.get('/networkmap', (req, res) => {
    return res.render('static/networkmap');
});
router.get('/', (req, res) => {
    return res.render("index");
});


router.post("/login", (req,res) => {
    if (req.body.username=="Tommy Vercetti" && req.body.pass=="thisismyaccount") 
        res.redirect('/users/login');
    return res.redirect("/users/metro");
});

module.exports = router;