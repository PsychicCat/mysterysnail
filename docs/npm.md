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
    
Example .env file:

    JWT_SECRET=suuuuupersecret // this should be a long random string
    MONERO_HOST=http://XXX.XX.XX.XX // use http://127.0.0.1 if wallet is hosted on the same machine
    MONERO_PORT=XXXXX // e.g. 18082, the port where simplewallet is bound to
    NODE_ENV=production
    DATABASE_URL=postgres://mysterysnail:PASSWORD@localhost:5432/mysterysnail // replace PASSWORD with the password entered when creating the mysterysnail postgres user
    PORT=XXXX // this is the port Node will host the app

### Edit Terms of Service:

    # from your local machine, clone the repository
    git clone https://github.com/PsychicCat/mysterysnail.git

* Navigate to the file at `/views/terms.jade` and replace the placeholder text.
* Commit your changes to the local repository with `git add .` then `git commit -m "terms"`.

### Start the app

    npm start
    
You may want to launch the app in a tmux or screen session.

### After Deployment

* Login as admin at `/login`.
* Navigate to `Settings` to change password. The default login is username: `admin`, password: `changethis`.
    
    
