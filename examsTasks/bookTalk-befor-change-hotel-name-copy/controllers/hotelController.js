
const { create, getById, update, deleteById, bookRoom } = require('../services/hotelService');
const { parseError } = require('../util/parser');

const hotelController = require('express').Router();

// hotelController.get('/:id/details', async (req, res) => {
//     const hotel = await getById(req.params.id);

//     hotel.user = req.user._id
//     if (hotel.owner == req.user._id) {
//         hotel.isOwner = true;
//     } else if (hotel.bookings.map(b => b.toString()).includes(req.user._id.toString())) {
//         hotel.isBooked = true; // TODO chech if book 
//     }
//     res.render ('details', {
//         title: 'Book Details',
//         hotel
//     });
// });

hotelController.get ('/create', (req, res) => {
    res.render('create', {
        title: 'Create Book'
    });
});
// TODO add new fields
hotelController.post('/create', async (req, res) => {
    const hotel = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        stars: Number(req.body.stars), 
        image: req.body.image,
        review: req.body.review,
        owner: req.user._id,
    };

    try {
        if (Object.values(hotel).some(v => !v)) {
            throw new Error('All fields are requried');
            }

        await create(hotel);
        res.redirect('/catalog'); // TODO redirect

    } catch (err) {
        res.render('create', {
        title: 'Create Book', 
        body: hotel, 
        errors: parseError(err)
        });
    }

});

hotelController.get('/:id/edit', async (req, res) => {
    const hotel = await getById(req.params.id);

    if (hotel.owner != req.user._id) {
        return res.redirect('/auth/login');
        }

    res.render('edit', {
        title: 'Edit Book',
        hotel
    });
});

hotelController.post('/:id/edit', async (req, res) => {
    const hotel = await getById(req.params.id);

    if (hotel.owner != req.user._id) {
        return res.redirect('/auth/login');
    }
// TODO add new fields
    const edited = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        stars: Number(req.body.stars), 
        image: req.body.image,
        review: req.body.review,
    };

    try {
        if (Object.values(edited).some(v => !v)) {
            throw new Error('All fields are requried');
            }

        await update(req.params.id, edited);
        res.redirect(`/details/${req.params.id}/details`);

    } catch (err) {
        res.render ('edit', {
            title: 'Edit Book',
            hotel: Object.assign(edited, {_id: req.params.id}),
            errors: parseError(err)
            });
    }

});

hotelController.get('/:id/delete', async (req, res) => {

    const hotel = await getById(req.params.id);

    if (hotel.owner != req.user._id) {
        return res.redirect('/auth/login');
    }

    await deleteById(req.params.id);
    res.redirect('/');

});


hotelController.get('/:id/book', async (req, res) => {

    const hotel = await getById(req.params.id);

    try {
        if (hotel.owner == req.user._id) {
        hotel.isOwner = true;
        throw new Error('Cannot book your own hotel');
    }
    if (hotel.bookings.map(b => b.toString()).includes(req.user._id.toString())) {
        hotel.isBooked = true;
        throw new Error('Cannot book twice');
    }

    await bookRoom(req.params.id, req.user._id);
    res.redirect(`/details/${req.params.id}/details`);

    } catch (err) {
    res.render('details', {
        title: 'Book Details',
        hotel,
        errors: parseError(err)
        });
    }
});


module.exports = hotelController;