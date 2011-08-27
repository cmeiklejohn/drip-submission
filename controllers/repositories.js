var Repository = require('.././models/repository.js').Repository;

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
