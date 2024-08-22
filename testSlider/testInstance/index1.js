

const store = require('./store.js');

const [getState, setState] = store();

setState();
setState();

console.log(getState());

module.exports = store;
