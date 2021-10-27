const { NavbarFragment } = require('./fragments/nav-bar');
const { CategoriesFilterFragment } = require('./fragments/categories-filter');
const { decoratePage, BasePage } = require('../../../lib');

class MainPage extends BasePage {
    constructor(page, pageRootSelector = 'app-products') {
        super(page, pageRootSelector);
        this.navbarFragment = new NavbarFragment(page);
        this.categoriesFilterFragment = new CategoriesFilterFragment(page);
    }
       
    async selectCategory(category) {
        await this.categoriesFilterFragment.selectCategory(category);
    }
    
    async getSiteBrandName() {
        return await this.navbarFragment.getBrandName();
    }    
}

decoratePage(MainPage)

module.exports = {
    MainPage
}