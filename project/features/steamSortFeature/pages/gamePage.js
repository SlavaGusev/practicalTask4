const BaseForm = require('../../../../framework/baseForm');
const Element = require('../../../../framework/element');
const StringUtils = require('../../../../framework/utils/stringUtils');

class GamePage extends BaseForm {

   constructor() {
      super('//div[contains(@class, "game_title_area")]', 'Game Page');
   }
   
   #discount =  new Element('//div[@class="discount_pct"]', 'Discount');
   #price =  new Element('//div[@class="discount_final_price"]', 'Discount'); 
   #downloadSteamButton =  new Element('//a[@class="header_installsteam_btn_content"]', 'Download Steam Button');      

   async getDiscount() {
      return StringUtils.getNumbersFromString(await this.#discount.getText());
   }

   async getPrice() {
      return StringUtils.getFloatNumbersFromString(await this.#price.getText())[0];
   }

   async isDiscount() {
      return await this.#discount.state().waitForExist();
   }
   
   async isPrice() {
      return await this.#price.state().waitForExist();
   }

   async downloadSteamClick() {
      return this.#downloadSteamButton.click();
   }
}

module.exports = new GamePage();