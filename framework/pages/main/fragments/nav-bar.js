const { decoratePage, BaseFragment, $element } = require('../../../../lib');

class NavbarFragment extends BaseFragment {
    constructor(page, fragmentRootSelector = 'div.container') {
        super(page, fragmentRootSelector);
        this.brandName = $element(this.page, 'a.navbar-brand');
    }
        
    async getBrandName() {
        return await this.brandName.textContent();
    }
    
}
decoratePage(NavbarFragment);

module.exports = {
    NavbarFragment
}