const BaseForm = require('../../../../framework/baseForm');
const Element = require('../../../../framework/element');
const StringUtils = require('../../../../framework/utils/stringUtils');
const config = require('../../../configs/config');

class VerificationPage extends BaseForm {

   constructor() {
      super('//div[@class="agegate_tags"]', 'Verification Page');
   }

   #viewPageButton =  new Element('//a[@class="btn_grey_white_innerfade btn_medium"]', 'View Page Button');
   
   async viewPageClick() {
      return this.#viewPageButton.click();
   }
}

module.exports = new VerificationPage();