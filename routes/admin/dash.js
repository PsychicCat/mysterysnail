var express = require('express');
var router = express.Router();
var Orders = require('../../models').Order;

/* GET home page. */
router.get('/', function(req, res, next) {
    //find all orders and render the admin dashboard
    Orders.findAll().then(function(orders){
        res.render('dash', {orders: orders});
    })
});

module.exports = router;