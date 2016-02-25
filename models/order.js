"use strict";

module.exports = function(sequelize, DataTypes) {
    var Order = sequelize.define("Order", {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        address: DataTypes.STRING,
        address2: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        zip: DataTypes.STRING,
        country: DataTypes.STRING,
        message: DataTypes.STRING,
        payment_id: DataTypes.STRING,
        integrated_address: DataTypes.STRING
    });
    return Order;
};