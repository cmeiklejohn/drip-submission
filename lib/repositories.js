var Repository  = require('../models/repository.js').Repository,
    Build       = require('../models/build.js').Build,
    resque      = require('../config/resque');

module.exports.createRepository = function(repos, callback) { 
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

    callback();
  });
};
