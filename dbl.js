const DBL = require('dblapi.js');
const config = require('./c')
const dbl = new DBL(config.DBL_TOKEN);


module.exports = dbl;