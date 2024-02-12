const { getById } = require("../services/mainService");

const detailsController = require('express').Router();

detailsController.get('/:id/details', async (req, res) => {
    const mainItem = await getById(req.params.id);
    
    try {
        mainItem.user = req.user._id
    
    if (mainItem.owner == req.user._id) {
        mainItem.isOwner = true;
    } else if (mainItem.bookings.map(b => b.toString()).includes(req.user._id.toString())) {
        mainItem.isDonate = true; 
    }
    res.render ('details', {
        title: 'Details',
        mainItem
    });
    } catch (error) {
        res.render ('details', {
            title: 'Details',
            mainItem
        });
    }
    
});

module.exports = detailsController;