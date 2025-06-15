const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
        secret: 'erock1357',
        resave: false,
        saveUninitialized: true,
        cookie: {
                maxAge: 1000 * 60 * 30 // 30 minutes in milliseconds
            }
}));

const cartRoutes = require('./routes/cart.routes.js');
const homeRoutes = require('./routes/home.routes.js');
app.use('/cart', cartRoutes);
app.use('/home', homeRoutes);

let idKorisnika = 0; 
app.get('/', (req, res) => {
        res.render("index", {id: ++idKorisnika});
});
app.listen(3000);