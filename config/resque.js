var resque = require('coffee-resque');

module.exports = resque.connect({ 
  host: 'carp.redistogo.com',
  port: 9222,
  password: 'f03a98f500b5d47431e38db0fea0bfe4'
});

console.log('Connected to Redis To Go');
