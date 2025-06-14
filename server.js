const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

const cartRoutes = require('./routes/cart.routes.js');
const homeRoutes = require('./routes/home.routes.js');
app.use('/cart', cartRoutes);
app.use('/home', homeRoutes);

let idKorisnika = 0; 
app.get('/', (req, res) => {
        res.render("index.ejs", {id: ++idKorisnika});
});
app.listen(3000);