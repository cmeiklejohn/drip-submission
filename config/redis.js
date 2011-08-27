var redis = require('redis'),
    app = require('../server');

var client = redis.createClient(
  app.set('credentials').redistogo.port,
  'carp.redistogo.com'
);

client.auth(app.set('credentials').redistogo.password, function(err) {
  if(err) throw err;
  console.log("Redis authenticated!");
});

client.on("error", function (err) {
  console.log("Redis connection error: " + err);
});

client.on("connect", function (err) {
  console.log('Connected to Redis To Go');
});

module.exports = client;
