const BaseForm = require('../../../../framework/baseForm');
const Element = require('../../../../framework/element');

class MainPage extends BaseForm {

   constructor() {
      super('//div[contains(@class, "home_ctn")]', 'Main Page');
   }

   #categoriesMenuItem = new Element('//a[@class="pulldown_desktop" and contains(text(), "Categories")]', 'Categories menu item')   
   #menuSubItem = (name) => { return new Element(`//a[@class="popup_menu_item" and contains(text(), "${name}")]`, 'Action menu subitem') }

   async categoriesMenuItemMoveTo() {
      return this.#categoriesMenuItem.moveTo();
   }

   async menuSubItemClick(name) {
      return this.#menuSubItem(name).click();
   }
}

module.exports = new MainPage();