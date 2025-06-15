const express = require('express');

const router = express.Router();

function logger(req, res, next) {
        console.log('Received a request for: ' + req.originalUrl);
		console.log(req.session.cart);
        next();
}

function adder(req, res, next) {
        console.log('Added 1 product to cart (id=' + req.params.id + ')');
        next();
}

function remover(req, res, next) {
        console.log('Removed 1 product from cart (id=' + req.params.id + ')');
        next();
}

router.use(logger);

router.get('/getAll', (req, res) => {
	const cart = req.session.cart || {};
    res.render('cart.ejs', {cart});
});
router.get('/add/:id', adder, (req, res) => {
        res.render('cart.ejs');
});
router.get('/remove/:id', remover, (req, res) => {
        res.render('cart.ejs');
});
router.post('/save', (req, res) => {
    let cart = req.body;
	if(!req.session.cart) req.session.cart = cart;
	else {
		for(let p in cart) {
			req.session.cart[p] = cart[p];
		}
	}
	console.log(req.session.cart);
	res.status(204).end();
});

module.exports = router;