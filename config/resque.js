var resque = require('coffee-resque');

module.exports = resque.connect({ 
  host: 'carp.redistogo.com',
  port: 9215,
  password: '3346ba780beb1f72e76a491fa6abb9ed'
});

console.log('Connected to Redis To Go');
