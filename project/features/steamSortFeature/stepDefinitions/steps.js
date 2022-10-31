const { Given, When, Then } = require('@wdio/cucumber-framework');
const { mainPage } = require('../pages');
const assert = require("chai").assert;
const StringUtils = require('../../../../framework/utils/stringUtils');

let orderGlobal = '';

Given(/^I am on the main page$/, async () => {
    assert.isTrue(await mainPage.waitForFormIsOpened(), 'Main page did not opened');
});

When(/^$/, async (game) => {

});

Then(/^$/, async () => {
});
