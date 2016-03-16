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
        message: DataTypes.TEXT,
        payment_id: DataTypes.STRING,
        amount: DataTypes.BIGINT,
        integrated_address: DataTypes.STRING,
        isPaid: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        isShipped: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        tx_hash: DataTypes.STRING,
        block_height: DataTypes.STRING,
        uuid: DataTypes.STRING
    });
    return Order;
};