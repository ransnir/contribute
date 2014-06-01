var contribute = require("../lib/main.js");

var config = {
    googleId : 'UA-48103058-1',
    googleSite : 'catjsteam.github.io'
};


contribute.init(config);

contribute.trackEvent("npm", "npm", "npm");