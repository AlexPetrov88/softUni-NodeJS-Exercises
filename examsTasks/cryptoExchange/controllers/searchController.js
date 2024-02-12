const { getAll } = require('../services/mainService');

const searchController = require('express').Router();


searchController.get('/', async (req, res) => {
    const searchName = req.query.name || '';
    const searchPayment = req.query.payment || '';
   
    const result = await getAll();
    const mainItems = result.filter(r => r.name.toLowerCase().includes(searchName.toLowerCase())).filter(r => r.payment.toLowerCase().includes(searchPayment.toLowerCase()));
    console.log(searchName);
    console.log(searchPayment);
    console.log(result);
    res.render ('search', {
        title: 'Search Page',
        mainItems,
        searchName,
        searchPayment
    });

});

module.exports = searchController;