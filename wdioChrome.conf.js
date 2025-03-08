const configWDIO = require("./wdio.conf");
const downDir = require("./config");
import { v4 as uuidv4 } from 'uuid';

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
                `--user-data-dir=/tmp/chrome-user-data-${uuidv4()}`
            ],
        },
        acceptInsecureCerts: true
    }],
    services: ['chromedriver'],
    ...configWDIO.config
}
