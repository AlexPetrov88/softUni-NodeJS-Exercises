const { getProductById, deleteById } = require('../services/productsService');

const router = require('express').Router();

router.get('/:id', (req, res) => {

    const id = req.params.id;
    const product = getProductById(id);

    res.render('delete', {
        product
    });
})

router.post('/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    await deleteById(id);

    res.redirect('/catalog')
})

module.exports = router;