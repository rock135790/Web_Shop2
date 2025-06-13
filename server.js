const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

const cartRoutes = require('./routes/cart.routes.js');
const homeRoutes = require('./routes/home.routes.js');
app.use('/', cartRoutes);
app.use('/', homeRoutes);

app.listen(3000);