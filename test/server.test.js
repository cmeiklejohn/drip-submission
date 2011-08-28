var app       = require('../server'),
    assert    = require('assert'), 
    mongoose  = require('../config/mongoose'),
    redis     = require('../config/redis'),
    resque    = require('../config/resque');

// Wow, hack.  Delay firing of the tests until callbacks fire for all connections to databases.
//
setTimeout(function(){

  exports['Load the index'] = function () {
    assert.response(app, 
      { url: '/' }, 
      { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' }},
      function(response) { 
        assert.includes(response.body, 'Drip is continuous integration for node.js.');
      }
    );
  };

  exports['Load the repository listing'] = function () {
    assert.response(app, 
      { url: '/repositories' }, 
      { status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8' }}
    );
  };

  exports['Load the repository listing for one owner'] = function () {
    assert.response(app, 
      { url: '/repositories/visionmedia' }, 
      { status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8' }}
    );
  };

  exports['Load information about one specific repository'] = function () { 
    assert.response(app, 
      { url: '/repositories/visionmedia/jade' }, 
      { status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8' }}
    );
  };

  // Arguabley the most hack; kill all connections or expresso hangs.
  //
  setTimeout(function () { 
    mongoose.disconnect(function() { console.log("Mongoose disconnected."); });
    resque.end(function() { console.log("Resque disconnected."); } );
    redis.end(function() { console.log("Redis disconnected."); } );
  }, 1000);

}, 1000);
