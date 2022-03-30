var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const ejs = require('ejs'); 

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get("/about", function(req,res){
  res.render("about");
});

app.get("/details", function(req,res){
  res.render("details");
});

app.get("/planner", function(req,res){
  res.render("planner");
});

app.get("/guest", function(req,res){
  res.render("guest");
});

app.get("/status", function(req,res){
  res.render("status");
});

app.get("/confirm", function(req,res){
  res.render("confirm");
});

app.get("/login_admin", function(req,res){
  res.render("login_admin");
});

app.get("/login", function(req, res){
  res.render('login');
});

app.get("/contact", function(req, res){
  res.render('contact');
});

app.get("/team", function(req, res){
  res.render('team');
});

app.get("/portfolio", function(req, res){
  res.render('portfolio');
});

app.get("/networkmap", function(req, res){
  res.render('networkmap');
});

app.post("/submit-form", function(req,res,next){
  res.render("submit-form");
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
