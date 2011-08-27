var Jobs = {
  succeed: function(arg, callback) { callback(); },
  fail: function(arg, callback) { callback(new Error('fail')); },
  build: function(build, callback) { 
    console.log('Build called with: ' + build);
    callback(build);
  } 
};

var resque = require('./config/resque');
var worker = resque.worker('builder', Jobs);

worker.on('job', function(worker, queue, job) {
  console.log("Attempting job; worker: " + worker + " queue: " + queue + " job: " + job);
})

worker.start();
