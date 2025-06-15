const express = require('express');

const router = express.Router();
const data = require('../data/mydata.js');

function getTotalAmount(req, res, next) {
    let total = 0;
    if(req.session.cart)
        total = req.session.cart.total || 0;
    req.total = total;
    next();
}

function checkId(req, res, next) {
    if (!/^(\d*)$/.test(req.params.id)) {
        return res.status(400).send('<h1>Bad Request</h1><p>Category ID must be a number.</p>');
    }
    else if (!/^(\d{1,10})$/.test(req.params.id)) {
        return res.status(400).send('<h1>Bad Request</h1><p>Category ID must be at most 10 digits.</p>');
    }
    else if (!/^(0|[1-9]\d{0,9})$/.test(req.params.id)) {
        return res.status(400).send('<h1>Bad Request</h1><p>Category ID can\'t have leading zeroes.</p>');
    }
    else next();
}
function getProductAmounts(req, res, next) {
    let amounts = {};
    let cart = req.session.cart || {};
    amounts.total = cart.total || 0;
    const category = data.categories[req.params.id];

    if (!category || !Array.isArray(category.products)) {
        return res.status(400).send('<h1>Bad Request</h1><p>Category ID not in database.</p>');
    }
    for(product of category.products) {
        if(!cart[product.name]) amounts[product.name] = 0;
        else amounts[product.name] = cart[product.name];
    }
    req.amounts = amounts;
    next();
}

router.get('/getCategories', getTotalAmount, (req, res) => {
    res.render('home.ejs', { naslov: 'ACTION', data: data, total: req.total});
});

router.get('/getProducts/:id', checkId, getProductAmounts, (req, res) => {
        const reqId = parseInt(req.params.id);
        if(typeof(data.categories[reqId]) === 'undefined') res.status(404).send('FAIL');
        else {
            let catName = data.categories[reqId].name;
            res.render('categories.ejs', {data: data, id: reqId, amounts: req.amounts});
        }  
});

module.exports = router;