var resque = require('coffee-resque'),
    app = require('../server');

module.exports = resque.connect({ 
  host: 'carp.redistogo.com',
  port: app.set('credentials').redistogo.port,
  password: app.set('credentials').redistogo.password
});

console.log('Connected to Redis To Go');
