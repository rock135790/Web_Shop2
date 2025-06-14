const express = require('express');

const router = express.Router();
const data = require('../data/mydata.js');

router.get('/getCategories', (req, res) => {
        console.log('Received a request for the home page!');
        res.render('home.ejs', { naslov: 'ACTION', data: data});
});
router.get('/:id', (req, res) => {
        const reqId = req.params.id;
        let page = 'FAIL';
        let catId = -1;
        for(category of data.categories) {
            if(reqId === category.name) {
                page = category.name;
                catId = category.id;
                break;
            }
        }
        console.log('Received a request for ' + reqId + ' at ' + catId);
        if(page === 'FAIL') res.status(404).send(page);
        else{
            res.render('categories.ejs', {data: data, id: catId});
        }
});

module.exports = router;