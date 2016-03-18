var express = require('express');
var router = express.Router();
var Orders = require('../models').Order;

router.get('/:uuid', function(req, res, next){
     console.log(req.params);
     //update the shipping status in database
     updateOrder(req.params.uuid);
     res.redirect('/admin/' + req.params.uuid);
});

module.exports = router;


// update the order attributes when shipped
function updateOrder(uuid){
     Orders.update({
          isShipped: true
     }, {
          where: {
               uuid: uuid
          }
     }).then(function(order) {
          console.log("Payment successfully received for order " + order);
     }).catch(function(e){
          console.log("error");
     })
}