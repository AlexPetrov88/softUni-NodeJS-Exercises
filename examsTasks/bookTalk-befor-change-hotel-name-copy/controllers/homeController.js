const { getAll, getById } = require('../services/hotelService');

const homeController = require('express').Router();


homeController.get('/', (req, res) => {
    res.render ('home', {
        title: 'Home Page',
    });
});

// TODO replace with real controller by assignment
homeController.get('/catalog', async (req, res) => {
    const hotels = await getAll();
    res.render ('catalog', {
        title: 'Catalog Page',
        hotels
    });
});


module.exports = homeController;