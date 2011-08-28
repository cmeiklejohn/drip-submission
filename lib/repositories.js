var Repository  = require('../models/repository.js').Repository,
    Build       = require('../models/build.js').Build,
    resque      = require('../config/resque');

module.exports.createRepositoryAndTriggerBuild = function(repos, branch, callback) { 
  Repository.findOne({ ownerName: repos.ownerName, name: repos.name  }, function (err, repository) { 
    if (err) throw err;

    if (!repository) {
      var repository = new Repository(repos);
    } else {
      // Update submitted origin to the new one incase the previous was
      // a permission denied.
      repository.url = repos.url;
    }

    // Save.
    repository.save(function (err) { if (err) throw err; });

    var build = new Build();
    build.branch = branch;
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
