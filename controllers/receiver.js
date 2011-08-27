var Repository  = require('../models/repository.js').Repository,
    Build       = require('../models/build.js').Build,
    resque      = require('../config/resque');

module.exports.receive = function (request, response) {
  if (!request.body.payload && req.is('application/x-www-form-urlencoded')) { 
    console.log("Received invalid post:", request.headers['content-type'], request.body);
    response.end();
    return;
  }

  console.log("Post received with payload" + request.body.payload);

  var payload         = JSON.parse(request.body.payload);
  var repos           = payload.repository;
  repos.ownerName     = repos.owner.name;
  delete repos.owner;

  console.log("Received a post from:", repos.url);

  var createRepository = require('../lib/repositories.js').createRepository;
  createRepository(repos, function() { 
    response.send("OK");
  });
};
