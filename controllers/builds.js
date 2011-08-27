var Repository  = require('.././models/repository.js').Repository,
    Build       = require('.././models/build.js').Build;

module.exports.list = function(request, response) { 
  var name        = request.params.name,
      owner_name  = request.params.owner_name;

  Repository.findOne({ owner_name: owner_name, name: name }, function(err, repository) { 
    if (err) throw err;
    response.send(repository.builds);
  });
};
