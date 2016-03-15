var express = require('express');
var router = express.Router();
var Orders = require('../models/index').Order;
var getPaymentIds = require('../lib/checkPayments');
var updateOrder = require('../lib/updateOrderStatus');
var jwt = require('express-jwt');

/* GET /admin page. */
router.get('/', function(req, res, next) {
    //find all orders and render the admin dashboard
    if(req.user && req.user.admin){
        Orders.findAll().then(function(orders){
            res.render('admin', {orders: orders, user: req.user});
        })
    } else {
        res.redirect('/login');
    }
});

/* GET /admin/:orderID */
router.get('/:uuid', function(req, res, next){
    Orders.find({where: {uuid: req.params.uuid}}).then(function(order){
        res.json(order.dataValues);
    });
});


module.exports = router;