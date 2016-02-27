var express = require('express');
var router = express.Router();
var Wallet = require('../lib/wallet');
var Random = require('random-js');
var engine = Random.engines.nativeMath;
var distribution = Random.hex(false);
var models = require('../models');

/* POST /order */
router.post('/', function(req, res, next){
    var order = req.body;
    order.payment_id = generatePaymentID();
    //generate a new payment address
    Wallet.integratedAddress(order.payment_id).then(function(response){
        order.integrated_address = response.integrated_address;
        models.Order.create(order).then(function(result){
            res.render('order', {title: 'Mystery Snail', order: result.dataValues});
        });
    });
});

//generate a 16 character hex string for the payment ID
function generatePaymentID(){
    return distribution(engine, 16);
}

module.exports = router;