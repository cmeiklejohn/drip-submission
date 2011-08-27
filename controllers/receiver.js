var Repository = require('../models/repository.js').Repository;
var Build = require('../models/build.js').Build;

var resque = require('../config/resque');

module.exports.receive = function(request, response) {
  if(!request.is('*/json') || !request.body.repository) {
    console.log("Received invalid post:", request.body);
    response.end();
    return;
  }
 
  var url = request.body.repository.url;
  var name = request.body.repository.name;
  var owner_name = request.body.repository.owner.name;

  console.log("Received a post from:", url);
  Repository.findOne({ url: url }, function(err, repository) { 
    if(err) throw err;

    if(!repository) {
      var repository = new Repository();
      repository.url = url;
      repository.name = name;
      repository.owner_name = owner_name;
      repository.save(function (err) { if(err) throw err; });
    }

    var build = new Build();
    repository.builds.push(build);
    repository.save(function (err) { 
      if(err) throw err; 
      resque.enqueue('builder', 'build', 
        { 
          repository_id: repository.id,
          build_id: build.id
        }
      );
    });

    response.send('OK');
  });
};
