const { decoratePage, BaseFragment } = require('../../../../lib');

class CategoriesFilterFragment extends BaseFragment {
    constructor(page, fragmentRootSelector = 'product-filter div.sticky-top') {
        super(page, fragmentRootSelector);
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