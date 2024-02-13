const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.send('<h2>Catalog Page</h2>');
});

router.get('/:detailsId', (req, res) => {
    console.log(req.params.detailsId);
    res.send('Details Page');
});

module.exports = router;