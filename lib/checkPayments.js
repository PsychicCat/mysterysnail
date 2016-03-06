var Orders = require('../models').Order;
var Wallet = require('./wallet');

/* Returns transaction info on any new received payments */

module.exports = function() {
    return new Promise((resolve, reject) => {
            // find all unpaid orders in db
            Orders.findAll({
            where: {isPaid: false}}).then(function(orders){
            var paymentIds = [];
            // push payment IDs to array
            orders.forEach(function(order){
               paymentIds.push(order.payment_id);
            });
            // retrieve any new payments with given ids
            if(paymentIds.length){
                Wallet.getBulkPayments(paymentIds, 800000).then(function(result){
                    resolve(result);
                });
            } else {
                resolve("No orders yet.");
            }
        })
    })
}