### Launch Monero Wallet in RPC Mode

    ./bitmonerod
    ./simplewallet --wallet-file $YOUR_WALLET_NAME --password $YOUR_WALLET_PASSWORD --rpc-bind-port $YOUR_PORT

If the wallet is hosted on an external host other than the web server, also include this flag to bind the IP address when you launch simplewallet: `--rpc-bind-ip XXX.XX.XX.XX`

### Install Node with NVM (Node Version Manager)

    # install NVM
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
    
    # install the latest version of Node and use the installed version
    nvm install 5.9
    nvm use 5.9
    
    # you can verify the installation was successful with
    node -v

### Install PostgreSQL and configure database

    # install Postgres packages
    sudo apt-get update
    sudo apt-get install postgresql postgresql-contrib
    
    # login to the postgres user account
    sudo -i -u postgres
    
    # create a new role (user)
    createuser --interactive
    Enter name of role to add: mysterysnail
    Shall the new role be a superuser? (y/n) n
    Shall the new role be allowed to create databases? (y/n) y
    Shall the new role be allowed to create more new roles? (y/n) n
    
    # create a new database
    createdb mysterysnail
    exit
    
### Clone repository and install dependencies

    
    
    
    
    
