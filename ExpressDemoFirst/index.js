const express = require('express');

const app = express();

const homeController = require('./homeController');
const createController = require('./createController');
const catalogController = require('./catalogController');

app.use('/', homeController);
app.use('/create', createController);
app.use('/catalog/', catalogController);

app.all('*', (req, res) => {
    res.status(403).send('404 Not Found(Custom Page)')
});

app.listen(3000);