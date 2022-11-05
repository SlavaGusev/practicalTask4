const BaseForm = require('../../../../framework/baseForm');
const Element = require('../../../../framework/element');
const StringUtils = require('../../../../framework/utils/stringUtils');
const config = require('../../../configs/config');

class SteamDownloadPage extends BaseForm {

   constructor() {
      super('//div[@id="about_greeting"]', 'Steam Download Page');
   }
   
   #installSteamButton =  new Element('//a[@class="about_install_steam_link"]', 'Install Steam Button');

   async installSteamButtonClick() {
      return this.#installSteamButton.click();
   }
}

module.exports = new SteamDownloadPage();