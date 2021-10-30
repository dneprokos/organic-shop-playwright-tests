const { decoratePage, BaseFragment, $element } = require('../../../../lib');

class CategoriesFilterFragment extends BaseFragment {
    constructor(page, fragmentRootSelector = 'product-filter div.sticky-top') {
        super(page, fragmentRootSelector);
    }
        
    async selectCategory(category) {
        await this.page.click(`a.list-group-item:has-text("${category}")`);
    }    
    
}
decoratePage(CategoriesFilterFragment);

module.exports = {
    CategoriesFilterFragment
}