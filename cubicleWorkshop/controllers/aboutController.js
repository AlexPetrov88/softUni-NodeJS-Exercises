const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('about', {
        title: 'About Company'
    })
})

module.exports = router;