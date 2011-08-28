var app       = require('../server'),
    assert    = require('assert'), 
    mongoose  = require('../config/mongoose'),
    redis     = require('../config/redis'),
    resque    = require('../config/resque');

module.exports = { 
  'Load the index': function() {
    assert.response(app, 
      { url: '/' }, 
      { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' }},
      function(response) { 
        assert.includes(response.body, 'Drip is continuous integration for node.js.');
      }
    );
  }
};
