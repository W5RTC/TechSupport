Integrate License in your Application
============================

Ubuntu/Debian Demo Integrate Steps:
----------------------------

**Integrate License**

1. Install Node.js
    - See https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager
    - `curl -sL https://deb.nodesource.com/setup | sudo bash -`
    - `sudo apt-get install -y nodejs`
5. Install NPM
   - `sudo apt-get install npm`

6. Clone Demo Repo
    - `git clone https://github.com/W5RTC/W5RTC_TechSupport.git`
    - `cd W5RTC_TechSupport/W5CAPI/Demo`
    - **Install NPM Packages**
    - ` npm install `
   - **Edit views/capi.html**
   - `<script src="http://yourserverIP/socket.io/socket.io.js"></script>`
   - `<script src="Your capi file"></script>`;
   - `var w5capi = new W5Peer({key:'YOU API KEY'});`
   -  **Edit views/w5rtc.html**
   - `<script src="http://yourserverIP/socket.io/socket.io.js"></script>`
   - `<script src="Your capi file"></script>`;
   - `var w5capi = new W5Peer({key:'YOU API KEY'});`
  
   -  **Install NPM Packages**
   -  `npm install`
   -  **Start Server**
   - `node server`
   -   **Let Start Browsing one tab**
   -  [http://IPADDRESS:PORT/capi]
    -   **Let Start Browsing other tab**
   -  [http://IPADDRESS:PORT/w5rtc]
