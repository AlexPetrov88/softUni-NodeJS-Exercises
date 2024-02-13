const express = require('express');
const hbs = require('express-handlebars').create({
    extname: '.hbs'
});

const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost:27017/testDB1';

start();

async function start() {

const homeController = require('./controllers/homeController');
const articlesController = require('./controllers/articlesController');
// const catalogController = require('./controllers/catalogController');
// const createController = require('./controllers/createController');
// const defaultTitle = require('./middlewares/defaultTitle');

const error404Controller = require('./controllers/error404Controller');

const app = express();

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.use(express.urlencoded({ extended: true }));
// app.use('/static', express.static('static'));

// app.use(defaultTitle('AirBnB'));

app.use(homeController);
app.use('/articles', articlesController);
// app.use('/catalog', catalogController);
// app.use('/create', createController);

app.all(error404Controller);

await mongoose.connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

console.log('Database is redy!');


app.listen(3000, () => console.log('Server listening on port 3000'));

}

