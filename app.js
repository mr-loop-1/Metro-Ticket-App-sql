const express = require('express');
const path = require('path');
const {
    bookingRouter,
    errorRouter,
    staticRouter,
    ticketRouter
} = require('./routes');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/booking', bookingRouter);
app.use('/ticket', ticketRouter);
app.use(staticRouter);
app.use(errorRouter.get404);  

app.listen(3000);
