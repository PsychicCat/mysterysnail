var express = require('express');
var router = express.Router();
var Users = require('../models').User;

/* GET /settings */
router.get('/', function(req, res, next){
    if(req.user && req.user.admin){
        res.render('settings', {user: req.user});
    } else {
        res.redirect('/login');
    }
});

/* POST /settings */
router.post('/', function(req, res, next){
    if(req.user && req.user.admin){
        var oldPass = req.sanitize(req.body.oldPass);
        var newPass = req.sanitize(req.body.newPass);

        // find the admin user and compare the old password
        Users.find({where: {username: 'admin'}}).then(function(admin){
            admin.comparePassword(oldPass, function(err, isValid){
                if(isValid){
                    // change the password
                    admin.generateHash(newPass).then(function(hash){
                        Users.update({password: hash}, {where: {username: admin.username}})})
                        .then(function(){
                        res.redirect('/admin');
                    });
                } else {
                    res.render('settings', {error: {message: "Current password is invalid.", user: req.user}});
                }
            });
        });
    } else {
       res.redirect('/login');
    }
});

module.exports = router;