const { waits } = require('../helpers');
const chalk = require('chalk');

class BaseElement {
    constructor(page, selector, elementName) {
        this.page = page;
        this.selector = selector;
        this.currentElement = null;
        this.name = elementName;
    }

    _replacePage(page) {
        this.page = page;
        this.currentElement = null;
    }

    async initThisElement() {
        await waits(this.page).waitVisibility(this.selector);
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
            if (value === '_replacePage') {
                return (page) => baseElement._replacePage(page)
            }

            return (...args) => baseElement.initThisElement().then((curElem) => {
                if (!baseElement.name) {
                    baseElement.name = 'BaseElement'
                }

                let message = `\t\t\t ${baseElement.name} execute ${value}`;
                if (args.length)
                    message = `${message} with arguments ${JSON.stringify(args)}`
                console.log(chalk.green(message))
                return curElem[value].call(curElem, ...args)
            })
        }
    })
}

module.exports = {
    $element
}