var exec = require('child_process').exec,
    NA = require("nodealytics");

module.exports = function() {
    var _me,
        googleId,
        googleSite,
        proxyAddress = undefined,
        category, action, label;

    (function() {
        var checkProxyCommand;

        if (!proxyAddress) {
            checkProxyCommand  = exec('npm config get proxy');
            checkProxyCommand.stdout.on('data', function (data) {
                if (data.indexOf("null") == 0){
                    proxyAddress = false;
                } else {
                    proxyAddress = data;
                }
            });
        }
    })();

    var sendEvent = function(category, action, label) {
        NA.trackEvent(category, action, label, function (err, resp) {
            if (!err && resp && resp.statusCode === 200) {
                console.log('Thank you for your contribution');
            }
        });
    };


    return {
        init : function(config) {
            if (config) {
                googleId = config.googleId;
                googleSite = config.googleSite;
                if (config.proxy) {
                    proxyAddress = config.proxy;
                }
                NA.initialize(googleId, googleSite, function () {
                });

            }
        },
        trackEvent : function(category, action, label) {
            var checkProxy;
            checkProxy = setInterval(function() {

                if (typeof proxyAddress !== "undefined") {
                    clearInterval(checkProxy);
                    if (proxyAddress) {
                        NA.setProxy(proxyAddress);
                    }
                    sendEvent(category, action, label);
                }
            } ,50);
        }
    };

}();

