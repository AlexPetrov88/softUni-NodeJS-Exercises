const { create } = require('../services/cubeDataService');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('create', {
        title: 'Create item form'
    })
})

// router.post('/', async (req, res) => {

//     try {
//         const dataBody = req.body;
//         const result = await create(dataBody);
//         res.redirect('/catalog/' + result.id)
//     } catch (err) {
//         res.render('create',{
//             title: 'Request error',
//             error: err.message
//         })
//     }

// })

router.post('/', async (req, res) => {
    try {
        const createData = req.body;
        const result = await create(createData);
        res.redirect('/catalog/' + result.id);
    } catch (error) {
        res.render('create', {
            title: 'Request error',
        })
    }
})

module.exports = router;