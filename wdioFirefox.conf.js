const configWDIO = require("./wdio.conf");
const downDir = require("./config");

exports.config = {
    capabilities: [{
        maxInstances: 4,
        browserName: 'firefox',
        'moz:firefoxOptions': {
            args: [
                '--headless',
                '--safebrowsing-disable-download-protection',
                '--incognito',
            ],
            'prefs': {
                'intl.accept_languages': 'en,en_EN',
                'browser.download.folderList': 2,
                'browser.download.dir': downDir,
            },
        },
        acceptInsecureCerts: true
    }],
    services: ['geckodriver'],
    ...configWDIO.config
}
