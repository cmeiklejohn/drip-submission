var app = require('../server'),
    assert = require('assert');

module.exports = { 
  'Load the index': function() { 
    assert.response(app, 
        { url: '/' }, 
        { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' }},
        function(response) { 
          assert.includes(response.body, 'drip: the expresso testing service');
        });
  }
};
