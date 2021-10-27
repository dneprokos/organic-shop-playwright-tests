const {waits} = require('./helpers');
const chalk = require('chalk');


/**
 * 
 * @param {function Constructor context} page 
 */
function decoratePage(page) {
    const { name } = page;

    const propertiesToDecorate = Object.getOwnPropertyNames(page.prototype)
    .filter(prop => {
        if (prop === 'constructor')
            return false;
        
        const descriptor = Object.getOwnPropertyDescriptor(page.prototype, prop)
        return !!descriptor.value;
    });

    propertiesToDecorate.forEach(prop => {
        const originalProp = page.prototype[prop]
        page.prototype[prop] = async function(...args) {
            /**
            * @example
            * Each page should have rootSelector
            * Root selector will be used to wait visibility of current page
            */

            let message = `${name} execute ${prop}`;
            if (name.includes('Fragment')) {
                message = `\t${message}`
            }

            console.log(chalk.green(message));
            await waits(this.page).waitVisibility(this.rootSelector)
            return originalProp.call(this, ...args);
        }
    })
}

module.exports = {
    decoratePage
}