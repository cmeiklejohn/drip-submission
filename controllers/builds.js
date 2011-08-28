var redis       = require('../config/redis.js');

var Repository  = require('../models/repository.js').Repository,
    Build       = require('../models/build.js').Build;

module.exports.list = function (request, response) { 
  var name      = request.params.name,
      ownerName = request.params.ownerName;

  Repository.findOne({ ownerName: ownerName, name: name }, function (err, repository) { 
    if (err) throw err;
    response.send(repository.builds);
  });
};

module.exports.show = function (request, response) { 
  var id        = request.params.id,
      name      = request.params.name,
      ownerName = request.params.ownerName;

  Repository.findOne({ ownerName: ownerName, name: name }, function (err, repository) { 
    if (err) throw err;

    var build = repository.builds.id(id)
    build.output = redis.lrange("builds:" + build.id, 0, -1, function(err, obj) {
      if (err) throw err;

      console.log("Retrieved output from redis for build log: " + obj);
      return obj;
    });

    response.send(build);
  });
};
