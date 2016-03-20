'use strict';
require('dotenv').load();
var Wallet = require('../lib/wallet');

describe('integrated address', function () {
    it('should return an integrated address', function (done) {
        Wallet.integratedAddress().then(function(result){
            var integrated_address = result.integrated_address;
            integrated_address.length.should.equal(106);
            done();
        });
    });
});