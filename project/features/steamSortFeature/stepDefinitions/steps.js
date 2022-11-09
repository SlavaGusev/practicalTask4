const { Given, When, Then } = require('@wdio/cucumber-framework');
const { mainPage, actionPage, gamePage, ageVerificationPage, verificationPage, steamDownloadPage } = require('../pages');
const assert = require("chai").assert;
const downDir = require('../../../../config.js');
const path = require("path");
const FileUtils = require('../../../../framework/utils/fileUtils');

let game;

Given(/^I am on the main page$/, async () => {
    assert.isTrue(await mainPage.waitForFormIsOpened(), 'Main page did not opened');
});

When(/^I am choosing '(.+)' games from the menu$/, async (genre) => {
    await mainPage.categoriesMenuItemMoveTo();
    await mainPage.menuSubItemClick(genre);
});

Then(/^I am on the action page$/, async () => {
    assert.isTrue(await actionPage.waitForFormIsOpened(), 'Main page did not opened');
});

When(/^I am choosing '(.+)' category$/, async (category) => {
    await actionPage.categoryItemClick(category);
});

When(/^Pick the game with the (biggest|smallest) discount$/, async (discount) => {
    if (discount === 'biggest') {
        game = await actionPage.getGameWithBiggestDiscount();    
    }
});

When(/^I go on the to the chosen game page$/, async () => {
    await actionPage.gameItemClick(game.position);
    const browser = require('../../../../framework/browser');
    await browser.switchToLastWindow();
    if (await ageVerificationPage.waitForFormIsOpened() || await actionPage.waitForFormIsOpened()) {
        await ageVerificationPage.fillValidData();
        await ageVerificationPage.viewPageClick();
    } else
    if (await verificationPage.waitForFormIsOpened()) {
        await verificationPage.viewPageClick();
    }
});

Then(/^I am on the game page$/, async () => {
    assert.isTrue(await gamePage.waitForFormIsOpened(), 'Game page did not opened');
});

Then(/^Price and discount are correct$/, async () => {
    assert.isTrue(await gamePage.isDiscount(), 'Discount does not exist');
    assert.isTrue(await gamePage.isPrice(), 'Final price does not exist');
    assert.equal(await gamePage.getDiscount(), game.discount,'Discount from action page do not match discount from game page');
    assert.equal(await gamePage.getPrice(), game.price,'Price from action page do not match discount from game page');
});

Then(/^I am able to download steam installer$/, async () => {
    await gamePage.downloadSteamClick();
    assert.isTrue(await steamDownloadPage.waitForFormIsOpened(), 'Steam download page did not opened');
    await steamDownloadPage.installSteamButtonClick();
    await browser.waitUntil(() => { return FileUtils.isFileExists(path.join(downDir, 'SteamSetup.exe'))});
});