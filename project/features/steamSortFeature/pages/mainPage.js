const BaseForm = require('../../../../framework/baseForm');
const Element = require('../../../../framework/element');

class MainPage extends BaseForm {

   constructor() {
      super('//div[contains(@class, "home_ctn")]', 'Main Page');
   }

   #searchInput = new Element('//input[@id="store_nav_search_term"]', 'Search Input')
   #searchButton = new Element('//a[@id="store_search_link"]/img', 'Search Button')

   async fillSearchInput(text) {
      await this.#searchInput.type(text);
   }
   
   async searchButtonClick() {
      await this.#searchButton.click();
   }
}

module.exports = new MainPage();