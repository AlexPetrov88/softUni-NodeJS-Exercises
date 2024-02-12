const { getById } = require("../services/hotelService");

const detailsController = require('express').Router();

detailsController.get('/:id/details', async (req, res) => {
    const hotel = await getById(req.params.id);
    
    try {
        hotel.user = req.user._id
    
    if (hotel.owner == req.user._id) {
        hotel.isOwner = true;
    } else if (hotel.bookings.map(b => b.toString()).includes(req.user._id.toString())) {
        hotel.isBooked = true; // TODO chech if book 
    }
    res.render ('details', {
        title: 'Book Details',
        hotel
    });
    } catch (error) {
        res.render ('details', {
            title: 'Book Details',
            hotel
        });
    }
    
});

module.exports = detailsController;