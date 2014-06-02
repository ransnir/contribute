# This is contribute to google Analytics - behind proxy without setting proxy

## Install

    npm install contribute

## Usage

    var config = {
        googleId : 'UA-xxxxxxxx-1',
        googleSite : 'xxxxxxxx.github.io'
    };

    contribute.init(config);

    contribute.trackEvent("category", "action", "label");