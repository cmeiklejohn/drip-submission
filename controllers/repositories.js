var Repository  = require('../models/repository.js').Repository,
    Build       = require('../models/build.js').Build,
    resque      = require('../config/resque');

module.exports.create = function(request, response) { 
  if (!request.body && req.is('application/json')) { 
    console.log("Received invalid post:", request.headers['content-type'], request.body);
    response.end();
    return;
  }

  console.log("creating from request.body:", JSON.stringify(request.body));

  var repos           = request.body.repository;
  repos.ownerName     = repos.owner.name;
  delete repos.owner;

  console.log("Received a post from:", repos.url);

  var createRepository = require('../lib/repositories.js').createRepository;
  createRepository(repos, function() { 
    response.send("OK");
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
  var name = request.params.name,
      ownerName = request.params.ownerName;

  Repository.findOne({ ownerName: ownerName, name: name  }, function (err, repository) { 
    if (err) throw err;
    response.send(repository);
  });
};
