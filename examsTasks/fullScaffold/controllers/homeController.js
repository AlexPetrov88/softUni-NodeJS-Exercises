const { getAll } = require('../services/mainService');

const homeController = require('express').Router();


homeController.get('/', async (req, res) => {
    const mainItems = await getAll();
    const lastThree = mainItems.slice(-3);
    
    res.render ('home', {
        title: 'Home Page',
        lastThree
    });
});

homeController.get('/catalog', async (req, res) => {
    const mainItems = await getAll();
    res.render ('catalog', {
        title: 'Catalog Page',
        mainItems
    });
});


module.exports = homeController;