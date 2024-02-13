const { Router } = require('express');

const router = Router();


router.get('/', (req, res) => {
    res.send('<form method="POST"><input name="name"><button>Create</button></form>');
});

router.post('/', (req, res) => {
    console.log('Heandling post request');
    res.write('Created Item')
    res.end();
});

module.exports = router;