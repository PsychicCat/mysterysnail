var express = require('express');
var router = express.Router();
var Orders = require('../models').Order;

router.get('/:uuid', function(req, res, next){
    //find the order and update the shipping status
     Orders.find({where: {uuid: req.params.uuid}}).then(function(order){

     })
});

module.exports = router;