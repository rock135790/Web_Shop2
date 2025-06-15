const express = require('express');
const session = require('express-session');

const router = express.Router();
const data = require('../data/mydata.js');

function logger(req, res, next) {
    console.log('Received a request for: ' + req.originalUrl);
    console.log(req.session.cart);
    next();
}

router.use(logger);

router.get('/getCategories', (req, res) => {
        res.render('home.ejs', { naslov: 'ACTION', data: data});
});

function getProductAmounts(req, res, next) {
    let amounts = {};
    let cart = req.session.cart || {};
    const category = data.categories[req.params.id];

    if (!category || !Array.isArray(category.products)) {
        console.warn(`Category with id ${req.params.id} not found or invalid.`);
        return res.status(404).send('Category not found');
    }
    for(product of category.products) {
        if(!cart[product.name]) amounts[product.name] = 0;
        else amounts[product.name] = cart[product.name];
    }
    req.amounts = amounts;
    next();
}

router.get('/getProducts/:id', getProductAmounts, (req, res) => {
        if (!/^(0|[1-9]\d{0,9})$/.test(req.params.id)) {
            console.log(`Validation failed: ID parameter "${req.params.id}" is not a number.`);
            return res.status(400).send('<h1>Bad Request</h1><p>Product ID must be a number.</p>');
        }
        const reqId = parseInt(req.params.id);
        if(typeof(data.categories[reqId]) === 'undefined') res.status(404).send('FAIL');
        else {
            let catName = data.categories[reqId].name;
            console.log(catName);
            res.render('categories.ejs', {data: data, id: reqId, amounts: req.amounts});
        }  
});

module.exports = router;