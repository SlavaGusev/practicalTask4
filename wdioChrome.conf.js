const configWDIO = require("./wdio.conf");
const downDir = require("./config");

exports.config = {
    capabilities: [{
        maxInstances: 4,
        browserName: 'chrome',
        'goog:chromeOptions': {
            'prefs': {
                // 'intl.accept_languages': 'ru,ru_RU'
                'safebrowsing.enabled': true,
                'download.default_directory': downDir,
            },
            args: [
                // 'headless',
                // 'disable-gpu',
                '--safebrowsing-disable-download-protection',
                // 'safebrowsing-disable-extension-blacklist'
            ],
        },
        acceptInsecureCerts: true
    }],
    services: ['chromedriver'],
    ...configWDIO.config
}
