var Repository  = require('../models/repository.js').Repository,
    Build       = require('../models/build.js').Build,
    resque      = require('../config/resque');

module.exports.receive = function (request, response) {
  if (!request.body.payload) {
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

  Repository.findOne({ url: repos.url }, function (err, repository) { 
    if (err) throw err;

    if (!repository) {
      var repository = new Repository(repos);
      repository.save(function (err) { if (err) throw err; });
    }

    var build = new Build();
    repository.builds.push(build);

    repository.save(function (err) { 
      if (err) throw err; 
      resque.enqueue('builder', 'build', [{
        buildId: build.id,
        repositoryId: repository.id
      }]);
    });

    response.send('OK');
  });
};
