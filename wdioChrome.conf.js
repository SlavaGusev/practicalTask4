const configWDIO = require("./wdio.conf");
const downDir = require("./config");

exports.config = {
    capabilities: [{
        maxInstances: 4,
        browserName: 'chrome',
        'goog:chromeOptions': {
            'prefs': {
                'safebrowsing.enabled': true,
                'download.default_directory': downDir,
            },
            args: [
                '--safebrowsing-disable-download-protection',
            ],
        },
        acceptInsecureCerts: true
    }],
    services: ['chromedriver'],
    ...configWDIO.config
}
