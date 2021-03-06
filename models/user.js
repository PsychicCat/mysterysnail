"use strict";
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 12;
var jsonwebtoken = require('jsonwebtoken');

module.exports = function(sequelize, DataTypes) {
    var userSchema = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING
    }, {
        timestamps: false,
        hooks: {
            beforeCreate: function(user, options) {
                return user.generateHash(user.password).then(function(hash){
                    user.password = hash;
                })
            }
        },
        instanceMethods: {
            comparePassword: function(password, cb) {
                cb(null, bcrypt.compareSync(password, this.password));
            },

            generateHash: function(password) {
                return new Promise((resolve, reject) => {
                        resolve(bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_WORK_FACTOR), null))
                })
            }

        },
        classMethods: {
            getAuthenticated: function(user, callback) {
                var options = {
                    where: {username: user.username}
                };
                userSchema.findOne(options).then(function(instance) {
                    //check if the user exists
                    if(!instance) {
                        console.log('No user found');
                        return callback(new Error('Invalid username or password.', 401), null);
                    } else {
                        // compare password
                        instance.comparePassword(user.password, function(err, isMatch) {
                            if(err) {
                                return callback(err);
                            } else if (isMatch) {
                                var user = {
                                    username: instance.username,
                                    admin: true
                                };
                                //return the jwt
                                var token = jsonwebtoken.sign(user, process.env.JWT_SECRET, {
                                    expiresIn: 1440 // expires in 24 hours
                                });
                                return callback(null, token, user);
                            } else {
                                return callback(new Error('Invalid username or password'), null);
                            }
                        })
                    }
                })
            }
        }
    });
    return userSchema;
};
