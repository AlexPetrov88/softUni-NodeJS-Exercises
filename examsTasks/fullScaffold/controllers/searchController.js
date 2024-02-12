const { getAll } = require('../services/mainService');

const searchController = require('express').Router();


searchController.get('/', async (req, res) => {
    const searchLocation = req.query.location || '';
   
    const result = await getAll();
    const mainItems = result.filter(a => a.location.toLowerCase().includes(searchLocation.toLowerCase()));
   
    res.render ('search', {
        title: 'Search Page',
        mainItems,
        searchLocation,
    });

});

module.exports = searchController;