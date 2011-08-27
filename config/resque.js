var resque = require('coffee-resque');

module.exports = resque.connect({ 
  host: 'carp.redistogo.com',
  port: 9198,
  password: '675f1ab0bd9310846989e6ef326a6237'
});

console.log('Connected to Redis To Go');
