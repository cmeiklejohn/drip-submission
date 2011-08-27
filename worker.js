var Repository  = require('./models/repository.js').Repository,
    Build       = require('./models/build.js').Build,
    resque      = require('./config/resque');

var Jobs = {
  succeed: function(arg, callback) { callback(); },
  fail: function(arg, callback) { callback(new Error('fail')); },
  build: function(build, callback) { 
    var build_id      = build.build_id;
    var repository_id = build.repository_id;

    console.log('Build called; repository_id: ' + repository_id + ' build_id: ' + build_id);

    Repository.findOne({ id: build.repository_id }, function (err, repository) { 
      if(err) throw err;

      var build = repository.builds.id(build_id);
      build.completed = true;
      repository.save(function (err) { if(err) throw err; });
    });

    callback(build);
  } 
};

var worker = resque.worker('builder', Jobs);

worker.on('job', function(worker, queue, job) {
  console.log("Attempting job; worker: " + worker + " queue: " + queue + " job: " + job);
})

worker.start();
