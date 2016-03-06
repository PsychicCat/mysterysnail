var Orders = require('../models').Order;
var checkPayments = require('./checkPayments');

module.exports = function() {
    // check payments
    checkPayments().then(function(result){
        // if there are new payments, update the db
        if(result.payments){
            var payments = result.payments;
            payments.forEach(function(payment){
                updateOrder(payment);
            })
        }
    })
}

// update the order attributes on a successful payment
function updateOrder(payment){
    Orders.update({
        isPaid: true,
        block_height: payment.block_height,
        tx_hash: payment.tx_hash
    }, {
        where: {
            payment_id: payment.payment_id,
            amount: {$lte: payment.amount}
        }
    }).then(function(order) {
        console.log("Payment successfully received for order " + order.id);
    }).catch(function(e){
        console.log("Payment error");
        console.log(e);
    })
}