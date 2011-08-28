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

  // Assume master branch for supplied repository.
  var branch          = "master";
  var repos           = request.body.repository;
  repos.ownerName     = repos.owner.name;
  delete repos.owner;

  // Sanitize the url of .git if it's a http origin, but not of a ssh
  // origin.
  //
  if(repos.url.indexOf('http') == 0) { 
    console.log("Sanitizing url");
    repos.url = repos.url.replace(/\.git$/,"");
  }

  console.log("Received a post from:", repos.url);
  console.log("Received build request for: " + repos.ownerName + "/" + repos.name);

  var createRepositoryAndTriggerBuild = require('../lib/repositories.js').createRepositoryAndTriggerBuild;
  createRepositoryAndTriggerBuild(repos, branch, function() { 
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
