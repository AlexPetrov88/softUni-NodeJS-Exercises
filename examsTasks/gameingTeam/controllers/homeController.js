const { getAll } = require('../services/mainService');

const homeController = require('express').Router();


homeController.get('/', (req, res) => {
    res.render ('home', {
        title: 'Home Page',
    });
});

// TODO replace with real controller by assignment
homeController.get('/catalog', async (req, res) => {
    const mainItems = await getAll();
    res.render ('catalog', {
        title: 'Catalog Page',
        mainItems
    });
});


module.exports = homeController;