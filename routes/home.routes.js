const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
        console.log('Received a request for the home page!');
        res.render('home.ejs');
});

module.exports = router;