const setupBrowser = require("./framework/browserActions");
const config = require("./project/configs/config.json");
exports.config = {
    specs: [
        './project/features/**/*.feature'
    ],
    exclude: [
    ],
    maxInstances: 10,
    capabilities: [{
        maxInstances: 4,
        browserName: 'chrome',
        // 'goog:chromeOptions': {
        //     args: [
        //         'headless',
        //         'disable-gpu'
        //     ],
        // },
        acceptInsecureCerts: true
    }],
    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['chromedriver'],
    framework: 'cucumber',
    reporters: ['spec'],
    cucumberOpts: {
        require: ['./project/features/**/stepDefinitions/steps.js'],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        snippets: true,
        source: true,
        strict: false,
        tagExpression: '',
        timeout: 60000,
        ignoreUndefinedDefinitions: false
    },
	beforeScenario: async () => {
        await browser.reloadSession();
        await setupBrowser();
        await browser.maximizeWindow();
        await browser.url(config.baseUrl);
    }
}
