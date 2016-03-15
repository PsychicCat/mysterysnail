var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.clearCookie('admin');
    res.redirect('/');
});

module.exports = router;