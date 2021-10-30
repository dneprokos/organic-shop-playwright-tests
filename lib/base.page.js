class BasePage {
    constructor(page, pageRootSelector) {
        this.page = page;
        this.rootSelector = pageRootSelector;
    }

    //Old school underscore was used to define private methods
    _replacePage(page) {
        this.page = page
        
        const excludeProps = ['page', 'rootSelector']
        const expectedProps = Object
            .getOwnPropertyNames(this)
            .filter(p => !excludeProps.includes(p))

        expectedProps.forEach((p) => {
            this[p]._replacePage.call(this[p], page)
        })
    }
}

module.exports = {
    BasePage
}