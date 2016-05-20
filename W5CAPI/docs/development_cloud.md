Cloud Machine Installation
============================

Using SSH to Access your Instance
----------------------------


1. For Mac OS or Linux, ensure that the permissions for the key pair file (with a .pem extension) you saved.  From a terminal window, enter the following:

```
    `$ chmod 400 KEYPAIR.pem`
    `$ ssh -i KEYPAIR.pem root@clouddsn`
```
2. For Windows, use [PuTTY and PuTTYgen](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) to convert your .pem to a .ppk file (once per key) then access the AMI. Open PuTTYgen and click **Load**.  You need to view all files to see and select the .pem file.

   ![Figure 1: Open PuTTYgen and Load your .pem file.](https://github.com/W5RTC/W5RTC_TechSupport/blob/master/W5CAPI/docs/images/1.puttygen.png?raw=true)

3. Click **Save the private key**.

   ![Figure 2: Save the private key.](https://github.com/W5RTC/W5RTC_TechSupport/blob/master/W5CAPI/docs/images/2.save_private_key.png?raw=true)

4. Close PuTTYgen and open PuTTY. Enter the public DNS address of your AMI in the **hostname** field.

   ![Figure 3: Enter the DNA address.](https://github.com/W5RTC/W5RTC_TechSupport/blob/master/W5CAPI/docs/images/3.Putty_enter_DNS.png?raw=true)

5. In the left menu, expand SSH and click **Auth**.  **Browse** to select the private key .ppk file you just made, then **Open** the connection to your AMI.  When prompted, log in as ``ubuntu``.

   ![Figure 4: Upload your private key into PuTTY.](https://github.com/W5RTC/W5RTC_TechSupport/blob/master/W5CAPI/docs/images/4.putty_enter_ppk.png?raw=true) 



Ubuntu/Debian W5CAPI Signalling Install Steps:
----------------------------

**W5CAPI Signalling**

1. Install Node.js
    - See https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager
    - `curl -sL https://deb.nodesource.com/setup | sudo bash -`
    - `sudo apt-get install -y nodejs`

2. Install MongoDB
    - See https://docs.mongodb.com/v3.0/tutorial/install-mongodb-on-ubuntu/
    - `sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10`
    - `echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
`
    - `sudo apt-get update`
    - `sudo apt-get install -y mongodb-org`

3. Install PostgresSQL
    - see http://www.postgresql.org/download/linux/ubuntu/
    - `sudo apt-get install postgresql-9.4`

4. Install GIT.
    - see https://help.ubuntu.com/lts/serverguide/git.html
    - `sudo apt install git`

5. Install NPM
   - `sudo apt-get install npm`

6. Install Redis
   - see http://redis.io/topics/quickstart
   - `wget http://download.redis.io/redis-stable.tar.gz`
   - `tar xvzf redis-stable.tar.gz`
   - `cd redis-stable`
   - `make`

6. Clone W5capi Repo
    - `git clone https://github.com/W5RTC/W5capi.git`
    - `cd W5capi/w5capi-Cloud/w5capiSIG`
   - **Edit configure.js**
   - `exports.redisIP= Your redis IP`;
   - `exports.redisPort=Your redis Port;`
   - `exports.mongoIP=Your Mongo IP;`
   - `exports.mongoPort=Your Mongo Port;`
   - `exports.sigURL=Your signalling server URL;`
   - `exports.stunURL=Your STUN URL;`
   - `exports.thirdpartystunURL=OPEN SOURCE STUN URL;`
   - `exports.turnURL=YOUR TURN URL;`
   - `exports.turnUsername='TURN Username;`
   - `exports.turnCredential=TURN Password;`
   - `exports.thirdpartyturnURL=OPEN SOURCE TURN URL;`
   - `exports.thirdpartyturnUsername=OPEN SOURCE TURN Username;`
   - `exports.thirdpartyturnCredential='OPEN SOURCE TURN Password';`
   - `exports.devAudioVideomins=1;`
   - `exports.devDatamins=2;`
   -  **Install NPM Packages**
   -  `npm install`
   -  **Start Server**
   - `node w5_sigServer`
   -   **Let Start Browsing**
   -  [http://PUBLICIPADDRESS:PORT/]

Ubuntu/Debian W5CAPI CDN Install Steps:
----------------------------

**W5CAPI CDN**

1. Install Node.js
    - See https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager
    - `curl -sL https://deb.nodesource.com/setup | sudo bash -`
    - `sudo apt-get install -y nodejs`

2. Install MongoDB
    - See https://docs.mongodb.com/v3.0/tutorial/install-mongodb-on-ubuntu/
    - `sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10`
    - `echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
`
    - `sudo apt-get update`
    - `sudo apt-get install -y mongodb-org`

3. Install PostgresSQL
    - see http://www.postgresql.org/download/linux/ubuntu/
    - `sudo apt-get install postgresql-9.4`

4. Install GIT.
    - see https://help.ubuntu.com/lts/serverguide/git.html
    - `sudo apt install git`

5. Install NPM
   - `sudo apt-get install npm`

6. Install Redis
   - see http://redis.io/topics/quickstart
   - `wget http://download.redis.io/redis-stable.tar.gz`
   - `tar xvzf redis-stable.tar.gz`
   - `cd redis-stable`
   - `make`

6. Clone W5capi Repo
    - `git clone https://github.com/W5RTC/W5capi.git`
    - `cd W5capi/w5capi-Cloud/w5capiCDN`
   - **Edit configure.js**
   - `exports.redisIP= Your redis IP`;
   - `exports.redisPort=Your redis Port;`
   - `exports.mongoIP=Your Mongo IP;`
   - `exports.mongoPort=Your Mongo Port;`
   - `exports.postgresIP='172.32.3.8';`
   - `exports.postgresPort='5432';`
   - `exports.psqlUsername='w5rtc';`
   - `exports.psqlPassword='w5rtc';`
   -  **Install NPM Packages**
   -  `npm install`
   -  **Start Server**
   - `node w5_cdnServer`
   -   **Let Start Browsing**
   -  [http://PUBLICIPADDRESS:PORT/]
