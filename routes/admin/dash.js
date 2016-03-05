var express = require('express');
var router = express.Router();
var models = require('../../models');

/* GET home page. */
router.get('/', function(req, res, next) {
    models.Order.findAll().then(function(orders){
        res.send(orders);
    })
});

module.exports = router;