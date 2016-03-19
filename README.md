# Mystery Snail

## Deployment Instructions

### Launch Monero Wallet in RPC Mode

    ./bitmonerod
    ./simplewallet --wallet-file $YOUR_WALLET_NAME --password $YOUR_WALLET_PASSWORD --rpc-bind-port $YOUR_PORT

If the wallet is hosted on an external host other than the web server, also include this flag to bind the IP address when you launch simplewallet: `--rpc-bind-ip XXX.XX.XX.XX`

### Install Dokku on the server

    wget https://raw.githubusercontent.com/dokku/dokku/v0.4.14/bootstrap.sh
    sudo DOKKU_TAG=v0.4.14 bash bootstrap.sh
Once the installation is complete, open a browser on your local machine and navigate to the server IP address to configure SSH key and virtual host settings. You will need to generate an SSH keypair on your local machine if you don't already have one. Here's a good walkthrough if needed: https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys--2

### Create the app, configure a PostgreSQL database, add environment variables
    
    # on your dokku host (server)
    dokku apps:create mysterysnail
    
    # install the postgres plugin
    sudo dokku plugin:install https://github.com/dokku/dokku-postgres.git
    
    # create a postgres service with the name mysterysnail-database
    dokku postgres:create mysterysnail-database
    
    # link the service to the app
    dokku postgres:link mysterysnail-database mysterysnail
    
    # add environment variables for Monero RPC wallet and JWT authentication
    dokku config:set mysterysnail JWT_SECRET=thisshouldbealongrandomstring MONERO_HOST=http://XXX.XX.XX.XX MONERO_PORT=XXXXX
  
By default, Dokku will make the app accessible on port 80. To change this to a specific port for I2P routing, use:
    
    dokku config:set mysterysnail DOKKU_NGINX_PORT=XXXX

### Deploy the Application
    
    # from your local machine, clone the repository
    git clone https://github.com/PsychicCat/mysterysnail.git
    
    # add the dokku host as a remote - replace the XXX with the server IP
    git remote add dokku dokku@XXX.XX.XX.XX:mysterysnail
    
    # finally, deploy the app!
    git push dokku master
    
If everything is successful, you should see something like this when the application is finished deploying:
    
    =====> Application deployed:
           http://mysterysnail.brendan.click
