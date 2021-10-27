const waits = require('./waits');
const doSingleton = require('./do.singleton');

module.exports = {
    ...waits,
    ...doSingleton
}