const BaseForm = require('../../../../framework/baseForm');
const Element = require('../../../../framework/element');
const StringUtils = require('../../../../framework/utils/stringUtils');
const config = require('../../../configs/config');

class AgeVerificationPage extends BaseForm {

   constructor() {
      super('//div[@class="agegate_birthday_selector"]', 'Age Verification Page');
   }
   
   #yearSelect =  new Element('//select[@id="ageYear"]', 'Year Select');
   #viewPageButton =  new Element('//a[@id="view_product_page_btn"]', 'View Page Button');

   async fillValidData() {
      return this.#yearSelect.selectDropdownOptionByValue(config.validYear);
   }

   async viewPageClick() {
      return this.#viewPageButton.click();
   }
}

module.exports = new AgeVerificationPage();