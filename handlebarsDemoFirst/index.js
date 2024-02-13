const express = require('express');
const hbr = require('express-handlebars');

const homeController = require('./cotrollers/homeController');
const catalogController = require('./cotrollers/catalogController');
const createController = require('./cotrollers/createController');
const deleteController = require('./cotrollers/deleteController');

const handlebars = hbr.create({
    extname: '.hbs',
});

const app = express();

app.engine('.hbs', handlebars.engine);
app.set("view engine", '.hbs');

app.use(express.urlencoded({extended: false}));
app.use('/static', express.static('static'));

app.use('/', homeController);
app.use('/catalog', catalogController);
app.use('/create', createController);
app.use('/delete', deleteController);

app.listen(3000);