const express = require("express");

const router = express.Router();

function adder(req, res, next) {
    if (req.session.cart && req.session.cart[req.params.id]) {
        req.session.cart["total"]++;
        req.session.cart[req.params.id]++;
        next();
    } else res.status(204).end();
}

function remover(req, res, next) {
    if (req.session.cart && req.session.cart[req.params.id]) {
        req.session.cart["total"]--;
        req.session.cart[req.params.id]--;
        if (req.session.cart[req.params.id] == 0)
            delete req.session.cart[req.params.id];
        next();
    } else res.status(204).end();
}

function dump(req, res, next) {
    req.session.cart = {};
    next();
}

router.get(["/", "/getAll"], (req, res) => {
    const cart = req.session.cart || {};
    res.render("cart", { cart });
});

router.post("/add/:id", adder, (req, res) => {
    const cart = req.session.cart || {};
    res.render("cart", { cart });
});

router.delete("/remove/:id", remover, (req, res) => {
    const cart = req.session.cart || {};
    res.render("cart", { cart });
});

router.delete("/removeAll", dump, (req, res) => {
    res.render("cart", { cart: req.session.cart });
});

router.post("/save", (req, res) => {
    let cart = req.body;
    if (!req.session.cart) req.session.cart = cart;
    else {
        for (let p in cart) {
            req.session.cart[p] = cart[p];
        }
    }
    res.status(204).end();
});

module.exports = router;
