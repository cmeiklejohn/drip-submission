var Repository  = require('./models/repository.js').Repository,
    Build       = require('./models/build.js').Build,
    resque      = require('./config/resque');

var mongoose = require('./config/mongoose');

var ObjectId = require('mongoose').Types.ObjectId; 

var Jobs = {
  succeed: function(arg, callback) { callback(); },
  fail: function(arg, callback) { callback(new Error('fail')); },
  build: function(build, callback) { 
    var build_id      = build.build_id;
    var repository_id = build.repository_id;

    console.log('Build called; repository_id: ' + repository_id + ' build_id: ' + build_id);

    Repository.findOne({ '_id': new ObjectId(repository_id) }, function (err, repository) { 
      if(err) throw err;

      console.log('Repository found: ' + repository);

      var build = repository.builds.id(build_id);
      build.completed = true;
      repository.save(function (err) { if(err) throw err; });
    });

    console.log('Build finished.');

    callback(build);
  } 
};

var worker = resque.worker('builder', Jobs);

worker.on('job', function(worker, queue, job) {
  console.log("Attempting job; worker: " + worker + " queue: " + queue + " job: " + job);
})

worker.start();
