const express = require('express');

const router = express.Router();

router.get('/cart', (req, res) => {
        console.log('Received a request for the cart!');
        res.render('cart.ejs');
});

module.exports = router;