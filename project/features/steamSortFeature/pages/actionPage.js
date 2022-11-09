const BaseForm = require('../../../../framework/baseForm');
const Element = require('../../../../framework/element');
const StringUtils = require('../../../../framework/utils/stringUtils');

class ActionPage extends BaseForm {

   constructor() {
      super('//div[contains(@class, "ContentHubTitle") and contains(text(), "Action")]', 'Action Page');
   }
   
   #saleDisplay =  new Element('//div[contains(@class, "sale_item_browser")]', 'Sale browser');
   #categoryItem = (category) => { return new Element(`//div[contains(@class, "saleitembrowser_FlavorLabel_Dhg57") and contains(text(), "${category}")]`, 'Category Item') };
   #gameItem = new Element('//div[@class="salepreviewwidgets_SaleItemBrowserRow_y9MSd"]', 'Game item');
   #gameItemByName = (position) => { return new Element(`//div[@class="salepreviewwidgets_SaleItemBrowserRow_y9MSd" and position() = ${position}]//div[@class="salepreviewwidgets_TitleCtn_1F4bc"]/a`, 'Game item');};  

   async categoryItemClick(category) {
      await this.#saleDisplay.scrollIntoView({block: 'center'});
      await this.#saleDisplay.state().waitForCSSProperty('opacity', 1);
      await this.#categoryItem(category).state().waitForClickable();
      return this.#categoryItem(category).click();
   }

   async getGameWithBiggestDiscount() {
      await this.#gameItem.state().waitForCSSProperty('opacity', 1);
      const gameInfo = await this.#gameItem.getTextFromElements();
      let maxDiscount = 0;
      let position = 1;
      const game = {};
      for (let element of gameInfo) {
         element = element.split('\n');
         if (element.length === 8) {
            const discount = StringUtils.getNumbersFromString(element[5]);
            if (discount > maxDiscount) {
               game.name = element[0];
               game.discount = discount;
               game.price = StringUtils.getFloatNumbersFromString(element[7])[0];
               game.position = position;
               maxDiscount = discount;
            }
         }
         position++;
      }
      return game;
   }

   async gameItemClick(name) {
      await this.#gameItemByName(name).scrollIntoView({block: 'center'});
      await this.#gameItemByName(name).moveTo({xOffset: -10, yOffset: 10});
      await this.#gameItemByName(name).state().waitForClickable();
      return this.#gameItemByName(name).click();
   }
}

module.exports = new ActionPage();