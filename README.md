# Mystery Snail

## Deployment Instructions

### Clone The Repository
    
    git clone https://github.com/PsychicCat/mysterysnail.git
    
### Define Environment Variables

* Create a file named `.env` in the root directory and define the variables as listed in the `example.env` file. 
* Commit these changes to your local repository.

### Launch Monero Wallet in RPC Mode

    ./bitmonerod
    ./simplewallet --wallet-file $YOUR_WALLET_NAME --password $YOUR_WALLET_PASSWORD --rpc-bind-port $YOUR_PORT