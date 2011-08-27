var Repository = require('.././models/repository.js').Repository;

module.exports.list = function(request, response) { 
  Repository.find(function(err, repositories) { 
    if(err) throw err;
    response.send(repositories);
  });
};

module.exports.show = function(request, response) { 
  var owner_name = request.params.owner_name;

  Repository.find({ owner_name: owner_name }, function(err, repositories) { 
    if(err) throw err;
    response.send(repositories);
  });
};
