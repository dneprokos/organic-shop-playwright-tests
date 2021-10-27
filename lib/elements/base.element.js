class BaseElement {
    constructor(page, selector) {
        this.page = page;
        this.selector = selector;
        this.currentElement = null
    }

    async initThisElement() {
        if (this.currentElement)
            return this.currentElement;

        const element = await this.page.$(this.selector);
        this.currentElement = element;
        return this.currentElement;
    }
}

function $element(page, selector) {
    const baseElement = new BaseElement(page, selector)
    return new Proxy(baseElement, {
        get(_t, value) {
            return (...args) => baseElement.initThisElement().then((curElem) => {
                return curElem[value].call(curElem, ...args)
            })
        }
    })
}

module.exports = {
    $element
}