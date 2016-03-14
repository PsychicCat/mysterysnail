"use strict";
var express = require('express');
var router = express.Router();
var Wallet = require('../lib/wallet');
var Random = require('random-js');
var engine = Random.engines.nativeMath;
var distribution = Random.hex(false);
var Orders = require('../models').Order;
var MoneroPrices = require('monero-prices');
var Q = require('q');
var uuid = require('node-uuid');
var padding = "000000000000000000000000000000000000000000000000";

/* GET /order */
router.get('/', function(req, res, next){
    res.render('form');
});

/* POST /order */
router.post('/', function(req, res, next){
    var order = sanitize(req);
    order.payment_id = generatePaymentID();
    order.uuid = uuid.v4();

    Q.spawn(function* () {
        order.integrated_address = yield generateIntegratedAddress(order.payment_id);
        order.amount = yield calculatePrice();
        order.payment_id += padding;
        Orders.create(order).then(function(result){
            res.render('order', {title: 'Mystery Snail', order: result.dataValues});
        })
    });
});


/**
 * Helper Functions for processing orders
 *
 */

// sanitize request body
function sanitize(req){
    var order = req.body;
    for(var prop in order){
        order[prop] = req.sanitize(order[prop]);
    }
    return order;
}

// generate a 16 character hex string for the payment ID
function generatePaymentID() {
    return distribution(engine, 16);
}

// generate an integrated address
function generateIntegratedAddress(paymentID) {
    return new Promise((resolve, reject) => {
        Wallet.integratedAddress(paymentID).then(function(result){
            resolve(result.integrated_address);
        });
    });
}

// retrieve current XMR price and return the expected price of order
function calculatePrice() {
    return new Promise((resolve, reject) => {
           MoneroPrices.get('USD').then(function(result){
            var amount = result.xmrBased * 0.5;
            amount = amount.toFixed(2);
            resolve(amount * 1e12);
        })
    });
}

module.exports = router;