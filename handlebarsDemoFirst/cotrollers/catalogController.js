const { getListOfData, getProductById } = require('../services/productsService');

const router = require('express').Router();


router.get('/', (req, res) => {
    const products = getListOfData();
    res.render('catalog', { 
        products
    });
});

router.get('/:productId', (req, res) => {

    const id = req.params.productId;
    const product = getProductById(id);
    if(product) {
        res.render('details', {
            product
        })
    } else {
        res.render('missingProduct', {
            id
        })
    }
})

module.exports = router;