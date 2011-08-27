var Repository = require('.././models/repository.js').Repository;

module.exports.list = function (request, response) { 
  Repository.find(function (err, repositories) { 
    if(err) throw err;
    response.send(repositories);
  });
};

module.exports.show = function (request, response) { 
  var ownerName = request.params.ownerName;

  Repository.find({ ownerName: ownerName }, function (err, repositories) { 
    if (err) throw err;
    response.send(repositories);
  });
};
