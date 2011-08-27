var Repository  = require('../models/repository.js').Repository,
    Build       = require('../models/build.js').Build,
    resque      = require('../config/resque');

module.exports.receive = function(request, response) {
  if (!request.is('*/json') || !request.body.repository) {
    console.log("Received invalid post:", request.body);
    response.end();
    return;
  }
 
  var url         = request.body.repository.url,
      name        = request.body.repository.name,
      owner_name  = request.body.repository.owner.name;

  console.log("Received a post from:", url);
  Repository.findOne({ url: url }, function (err, repository) { 
    if (err) throw err;

    if (!repository) {
      var repository = new Repository();
      repository.url = url;
      repository.name = name;
      repository.owner_name = owner_name;
      repository.save(function (err) { if(err) throw err; });
    }

    var build = new Build();
    repository.builds.push(build);
    repository.save(function (err) { 
      if (err) throw err; 
      resque.enqueue('builder', 'build', [{
        build_id: build.id,
        repository_id: repository.id
      }]);
    });

    response.send('OK');
  });
};
