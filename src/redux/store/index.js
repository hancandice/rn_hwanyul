/*
Redux store configuration.
Require and export different files for production and development.
*/

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
  console.log('Production Mode');
} else {
  module.exports = require('./dev');
  console.log('Development Mode');
}
