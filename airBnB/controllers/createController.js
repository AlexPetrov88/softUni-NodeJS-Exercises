const { create } = require('../services/roomDatabaseServices');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('createView', {
        title: 'Create room inAirBnB'
    });
});

router.post('/', async (req, res) => {
    try {
        const createData = req.body;
        const result = await create(createData);
        res.redirect('/catalog/' + result._id);
    } catch (error) {
        res.render('createView', {
            title: 'Request error',
            error: error.message.split('\n')
        })
    }
})


module.exports = router;
