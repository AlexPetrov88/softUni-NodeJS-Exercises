
const { create, getById, update, deleteById, bookRoom } = require('../services/mainService');
const { parseError } = require('../util/parser');

const mainController = require('express').Router();

// mainController.get('/:id/details', async (req, res) => {
//     const mainItem = await getById(req.params.id);

//     mainItem.user = req.user._id
//     if (mainItem.owner == req.user._id) {
//         mainItem.isOwner = true;
//     } else if (mainItem.bookings.map(b => b.toString()).includes(req.user._id.toString())) {
//         mainItem.isBooked = true; // TODO chech if book 
//     }
//     res.render ('details', {
//         title: 'Details',
//         mainItem
//     });
// });

mainController.get ('/create', (req, res) => {
    res.render('create', {
        title: 'Create'
    });
});
// TODO add new fields
mainController.post('/create', async (req, res) => {
    const mainItem = {
        platform: req.body.platform,
        name: req.body.name,
        image: req.body.image,
        price: Number(req.body.price), 
        genre: req.body.genre,
        description: req.body.description,
        owner: req.user._id,
    };

    try {
        if (Object.values(mainItem).some(v => !v)) {
            throw new Error('All fields are requried');
            }

        await create(mainItem);
        res.redirect('/catalog'); // TODO redirect

    } catch (err) {
        res.render('create', {
        title: 'Create', 
        body: mainItem, 
        errors: parseError(err)
        });
    }

});

mainController.get('/:id/edit', async (req, res) => {
    const mainItem = await getById(req.params.id);

    if (mainItem.owner != req.user._id) {
        return res.redirect('/auth/login');
        }

    res.render('edit', {
        title: 'Edit',
        mainItem
    });
});

mainController.post('/:id/edit', async (req, res) => {
    const mainItem = await getById(req.params.id);

    if (mainItem.owner != req.user._id) {
        return res.redirect('/auth/login');
    }
// TODO add new fields
    const edited = {
        platform: req.body.platform,
        name: req.body.name,
        image: req.body.image,
        price: Number(req.body.price), 
        genre: req.body.genre,
        description: req.body.description,
    };

    try {
        if (Object.values(edited).some(v => !v)) {
            throw new Error('All fields are requried');
            }

        await update(req.params.id, edited);
        res.redirect(`/details/${req.params.id}/details`);

    } catch (err) {
        res.render ('edit', {
            title: 'Edit',
            mainItem: Object.assign(edited, {_id: req.params.id}),
            errors: parseError(err)
            });
    }

});

mainController.get('/:id/delete', async (req, res) => {

    const mainItem = await getById(req.params.id);

    if (mainItem.owner != req.user._id) {
        return res.redirect('/auth/login');
    }

    await deleteById(req.params.id);
    res.redirect('/catalog');

});


mainController.get('/:id/booked', async (req, res) => {

    const mainItem = await getById(req.params.id);

    try {
        if (mainItem.owner == req.user._id) {
            mainItem.isOwner = true;
        throw new Error('Cannot book your own mainItem');
    }
    if (mainItem.bookings.map(b => b.toString()).includes(req.user._id.toString())) {
        mainItem.isBooked = true;
        throw new Error('Cannot book twice');
    }

    await bookRoom(req.params.id, req.user._id);
    res.redirect(`/details/${req.params.id}/details`);

    } catch (err) {
    res.render('details', {
        title: 'Details',
        mainItem,
        errors: parseError(err)
        });
    }
});


module.exports = mainController;