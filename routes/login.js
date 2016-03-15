var express = require('express');
var router = express.Router();
var Users = require('../models').User;
var jwt = require('express-jwt');

/* GET /login */
router.get('/', function(req, res, next) {
    if(!req.user){
        res.render('login');
    } else if (req.user.admin) {
        res.redirect('/admin');
    }
});

/* POST /login */
router.post('/', function(req, res, next){
    if(req.body.username && req.body.password){
        req.body.username = req.sanitize(req.body.username);
        req.body.password = req.sanitize(req.body.password);

        Users.getAuthenticated(req.body, function(err, token, user) {
            if(err) {
                console.log("error", err);
                res.render('login', {error: err});
            } else {
                res.cookie('admin', token, {httpOnly: true});
                res.redirect('/admin');
            }
        })
    } else {
        res.status(400).send("Error: Please enter username and password");
    }
});

module.exports = router;
