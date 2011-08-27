var Repository = require('.././models/repository.js').Repository;

module.exports.create = function(request, response) { 
  if (!request.body && req.is('application/json')) { 
    console.log("Received invalid post:", request.headers['content-type'], request.body);
    response.end();
    return;
  }

  var repos           = request.body.repository;
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

module.exports.list = function (request, response) { 
  var ownerName = request.params.ownerName;

  if(ownerName) { 
    Repository.find({ ownerName: ownerName }, function (err, repositories) { 
      if(err) throw err;
      response.send(repositories);
    });
  } else { 
    Repository.find(function (err, repositories) { 
      if(err) throw err;
      response.send(repositories);
    });
  }
};

module.exports.show = function (request, response) { 
  var name = request.params.name;
  var ownerName = request.params.ownerName;

  Repository.findOne({ ownerName: ownerName, name: name  }, function (err, repository) { 
    if (err) throw err;
    response.send(repository);
  });
};
