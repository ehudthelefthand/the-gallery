const env = process.env.NODE_ENV || 'dev'
module.exports = require(`./${env}.js`)