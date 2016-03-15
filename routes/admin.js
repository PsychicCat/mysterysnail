var express = require('express');
var router = express.Router();
var Orders = require('../models/index').Order;
var getPaymentIds = require('../lib/checkPayments');
var updateOrder = require('../lib/updateOrderStatus');
var jwt = require('express-jwt');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.user);
    //find all orders and render the admin dashboard
    Orders.findAll().then(function(orders){
        res.render('admin', {orders: orders, user: req.user});
    })
});


module.exports = router;