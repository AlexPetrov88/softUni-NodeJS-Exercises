const { create } = require('../services/productsService');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('Create');
});

router.post('/', async (req, res, next) => {

    try {
        await create(req.body.name, Number(req.body.price));
    } catch (error) {
        next(error);
    }
    res.redirect('/catalog');
})

module.exports = router;