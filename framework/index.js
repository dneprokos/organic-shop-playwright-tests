const {MainPage} = require('./pages');
const {doSingleton} = require('../lib');

const pageProvider = (page) => ({
    main: () => doSingleton(MainPage, page)
})

module.exports = {
    pageProvider
}