var MoneroWallet = require('monero-nodejs');
//if you are hosting simplewallet on another server, pass in a config object with host and port when you initialize MoneroWallet
//example: {host: 'xxx.xxx.xxx.xx', port: '18082'}

var config = {
    hostname: process.env.MONERO_HOST,
    port: process.env.MONERO_PORT
};

var Wallet = new MoneroWallet(config);

module.exports = Wallet;