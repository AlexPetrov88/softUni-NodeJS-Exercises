const express = require('express');
const path = require('path');

const router = express.Router();

// router.use(express.static('static'));

router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './static/index.html'));
});

module.exports = router;