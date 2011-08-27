var Repository = require('.././models/repository.js').Repository;

module.exports.list = function(request, response) { 
  Repository.find(function(err, repositories) { 
    response.send(repositories);
  });
};
