const express = require('express');

const hbs = require('express-handlebars').create({
    extname: '.hbs'
});

const port = 3000;

const catalogController = require('./controllers/catalogController');
const aboutController = require('./controllers/aboutController');
const createController = require('./controllers/createController');

const error404Controller = require('./controllers/error404Controller');

const app = express();

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('static'));

app.use('/', catalogController);
app.use('/about', aboutController);
app.use('/create', createController);

app.all('/*', error404Controller);


app.listen(port);