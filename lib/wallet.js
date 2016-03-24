var MoneroWallet = require('monero-nodejs');

var Wallet = new MoneroWallet(process.env.MONERO_HOST, process.env.MONERO_PORT);

module.exports = Wallet;