"use strict";
var express = require('express');
var router = express.Router();
var Wallet = require('../lib/wallet');
var Random = require('random-js');
var engine = Random.engines.nativeMath;
var distribution = Random.hex(false);
var models = require('../models');
var MoneroPrices = require('monero-prices');
var Q = require('q');

/* POST /order */
router.post('/', function(req, res, next){
    var order = req.body;
    order.payment_id = generatePaymentID();
    Q.spawn(function* () {
        order.integrated_address = yield generateIntegratedAddress(order.payment_id);
        order.amount = yield calculatePrice();
        models.Order.create(order).then(function(result){
            res.render('order', {title: 'Mystery Snail', order: result.dataValues});
        })
    });
});

// generate a 16 character hex string for the payment ID
function generatePaymentID() {
    return distribution(engine, 16);
}

// generate an integrated address
function generateIntegratedAddress(paymentID) {
    return new Promise((resolve, reject) => {
        Wallet.integratedAddress().then(function(result){
            resolve(result.integrated_address);
        });
    });
}

// retrieve current XMR price and return the expected price of order
function calculatePrice() {
    return new Promise((resolve, reject) => {
           MoneroPrices.get('USD').then(function(result){
            var amount = result.xmrBased * 2.5;
            resolve(amount.toFixed(2));
        })
    });
}

module.exports = router;