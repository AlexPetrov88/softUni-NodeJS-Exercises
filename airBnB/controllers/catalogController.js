const { getAll, getById } = require('../services/roomDatabaseServices');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const city = req.query.city || '';
    const search = req.query.search || '';
    const fromPrice = Number(req.query.fromPrice || 1);
    const toPrice = Number(req.query.toPrice || 1000);
    // console.log(req.query.city);

    const rooms = await getAll(city, search, fromPrice, toPrice);
    res.render('catalogView', {
        title: 'All Acomodation',
        rooms,
        city,
        search,
        fromPrice,
        toPrice
    });
})

router.get('/:id', async (req, res) => {
    const roomId = req.params.id;
    const room = await getById(roomId);

    if(room) {
        res.render('detailsView', {
            title: 'Acomodation details',
            room
        });
    } else {
        res.render('404')
    }
})
module.exports = router;