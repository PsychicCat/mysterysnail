var express = require('express');
var router = express.Router();
var Users = require('../models').User;
var jwt = require('express-jwt');

/* GET /admin */
router.get('/', function(req, res, next) {
    if(!req.user){
        res.render('login');
    } else if (req.user.admin) {
        res.redirect('/admin');
    }
});

/* POST /admin */
router.post('/', function(req, res, next){
    if(req.body.username && req.body.password){
        Users.getAuthenticated(req.body, function(err, token, user) {
            if(err) {
                console.log("error", err);
                res.status(400).send({message: err.message});
            } else {
                res.cookie('admin', token);
                res.redirect('/admin');
            }
        })
    } else {
        res.status(400).send("Error: Please enter username and password");
    }
});

module.exports = router;
