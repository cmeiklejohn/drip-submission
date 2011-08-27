var Repository  = require('.././models/repository.js').Repository,
    Build       = require('.././models/build.js').Build;

module.exports.list = function (request, response) { 
  var name      = request.params.name,
      ownerName = request.params.ownerName;

  Repository.findOne({ ownerName: ownerName, name: name }, function (err, repository) { 
    if (err) throw err;
    response.send(repository.builds);
  });
};
