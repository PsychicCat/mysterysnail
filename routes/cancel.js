var express = require('express');
var router = express.Router();
var Orders = require('../models').Order;

router.get('/:uuid', function(req, res, next){
    req.params.uuid = req.sanitize(req.params.uuid);
    // delete order from database
    Orders.destroy({where: {uuid: req.params.uuid}}).then(function(success){
        res.redirect('/');
    })
});

module.exports = router;