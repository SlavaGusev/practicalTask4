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
                '--headless',
                '--safebrowsing-disable-download-protection',
                '--incognito',
                `--user-data-dir=app/chrome-user-data`
            ],
        },
        acceptInsecureCerts: true
    }],
    services: ['chromedriver'],
    ...configWDIO.config
}
