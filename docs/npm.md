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
    
    # verify the installation was successful with
    node -v

### Install PostgreSQL and configure database

    # install Postgres packages
    sudo apt-get update
    sudo apt-get install postgresql postgresql-contrib
    
    # login to the postgres user account
    sudo -i -u postgres
    
    # create a new role (database user)
    createuser -P -s -e mysterysnail
    
    # create a new database
    createdb mysterysnail
    
    # exit out of the postgres user
    exit
    
### Install dependencies and clone repository

    sudo apt-get install build-essential
    git clone https://github.com/PsychicCat/mysterysnail.git
    cd mysterysnail
    npm install
    
### Configure environment variables 

    # open example.env in text editor and edit example values, then save file
    vim example.env
    
    # rename example.env to .env
    mv example.env .env
    
### Start the app

    npm start
    
You may want to launch the app in a tmux or screen session.
    
    
