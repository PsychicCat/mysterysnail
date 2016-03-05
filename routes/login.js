var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('login', {title: 'Mystery Snail'});
});

/* POST /login */
router.post('/', function(req, res, next){
    if(req.body.username && req.body.password){
        models.User.getAuthenticated(req.body, function(err, token, user) {
            if(err) {
                console.log(err);
                res.status(400).send({message: err.message});
            } else {
                res.send({token: token, user: user});
            }
        })
    } else {
        res.status(400).send("Error: Please enter username and password");
    }
});

module.exports = router;
