const { decoratePage, BaseFragment } = require('../../../../lib');

class NavbarFragment extends BaseFragment {
    constructor(page, fragmentRootSelector = 'div.container') {
        super(page, fragmentRootSelector);
    }
    
    get brandName() {
        return this.page.$('a.navbar-brand');
    }
    
    async getBrandName() {
        // await waits(this.page).waitVisibility('a.navbar-brand');
        // const elementHandle = await this.page.$('a.navbar-brand');
        // return elementHandle.textContent();
        return await ( await this.brandName).textContent();
    }
    
}
decoratePage(NavbarFragment);

module.exports = {
    NavbarFragment
}