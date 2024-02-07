const { getAll, getById } = require('../services/cubeDataService');

const router = require('express').Router();

router.get('/', (req, res) => {

    const cubes = getAll();
    res.render('catalog', {
        title: 'Cube catalog',
        cubes
    })
});

router.post('/:id', (req, res) =>  {

    const id = req.params.id;
    console.log(id);
    const cube = getById(id);
    if(cube) {
        res.render('details', {
            title: 'Cube details',
            cube
        })
    } else {
            res.render('404')
        } 
})

module.exports = router;

