const { decoratePage } = require('../../../../lib');

class CategoriesFilterFragment {
    constructor(page, fragmentRootSelector = 'product-filter div.sticky-top') {
        this.page = page;
        this.rootSelector = fragmentRootSelector;
    }
    
    get categories() {
        return this.page.$('a.list-group-item');
    }
    
    async selectCategory(category) {
        await this.page.click(`a.list-group-item:has-text("${category}")`);
    }    
    
}
decoratePage(CategoriesFilterFragment);

module.exports = {
    CategoriesFilterFragment
}