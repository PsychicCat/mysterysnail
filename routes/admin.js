var express = require('express');
var router = express.Router();
var Orders = require('../models/index').Order;
var getPaymentIds = require('../lib/checkPayments');
var updateOrder = require('../lib/updateOrderStatus');

/* GET home page. */
router.get('/', function(req, res, next) {
    //find all orders and render the admin dashboard
    Orders.findAll().then(function(orders){
        res.render('admin', {orders: orders, user: req.user});
    })
});

router.get('/test', function(req, res, next){
    getPaymentIds().then(function(result){
        res.send(result);
    });
});

router.get('/test2', function(req, res, next){
    updateOrder();
});

module.exports = router;