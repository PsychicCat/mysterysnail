var express = require('express');
var router = express.Router();
var Orders = require('../models').Order;

router.get('/', function(req, res, next){
    res.render('track');
});

router.post('/', function(req, res, next){
    var id = req.sanitize(req.body.uuid).trim();
    Orders.find({where: {uuid: id}}).then(function(result){
        res.json(result.dataValues);
    });
});

module.exports = router;