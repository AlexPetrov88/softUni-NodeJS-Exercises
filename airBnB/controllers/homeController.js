const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('homeView');
})

router.get('/about', (req, res) => {
    res.render('aboutView', {
        title: 'About us'
    });
})

module.exports = router;