const { getAll } = require('../services/mainService');

const searchController = require('express').Router();


searchController.get('/', async (req, res) => {
   
    const mainItems = await getAll();
    res.render ('search', {
        title: 'Search Page',
        mainItems
    });

});

module.exports = searchController;