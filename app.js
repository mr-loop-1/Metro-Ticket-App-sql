const express = require('express');
const path = require('path');


const usersRouter = require('./routes/users');
const errorController = require('./routes/error');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/booking', bookingRouter);
app.use('/ticket', usersRouter);
app.use(staticRouter);
app.use(errorController.get404);  

app.listen(3000);
