const configWDIO = require("./wdio.conf");
const downDir = require("./config");
const path = require('path');
const os = require('os');
const fs = require('fs');

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
                `--user-data-dir=${fs.mkdtempSync(path.join(os.tmpdir(), 'chrome-user-data-'))}`
            ],
        },
        acceptInsecureCerts: true
    }],
    services: ['chromedriver'],
    ...configWDIO.config
}
