var redis = require('redis'),
    app = require('../server');

var client = redis.createClient(
  app.set('credentials').redistogo.port,
  app.set('credentials').redistogo.host
);

client.auth(app.set('credentials').redistogo.password, function(err) {
  if(err) throw err;
  console.log("Redis authenticated!");
});

client.on("error", function (err) {
  console.log("Redis connection error: " + err);
});

client.on("connect", function (err) {
  console.log('Connected to Redis');
});

module.exports = client;
