'use strict';
require('dotenv').config();
var Wallet = require('../lib/wallet');
console.log(Wallet);
describe('split integrated address', function () {
    it('should return a standard address and payment id', function (done) {
        var integrated_address = '4BrqeWUakFnWTfbNbRvxutNMx9PEhURcbR9hWEoR6D8AHNKc6LzvhZbQ5GwCSsLib52GMFj3xamiF3vNwkcYS76dXXaiMmpgTKR2x5RGaW';
        Wallet.splitIntegrated(integrated_address).then(function(result){
            var standard_address = result.standard_address;
            var payment_id = result.payment_id;
            payment_id.length.should.equal(18);
            standard_address.length.should.equal(95);
            done();
        });
    });
});