var sys         = require('sys'),
    spawn       = require('child_process').spawn,
    Repository  = require('./models/repository.js').Repository,
    Build       = require('./models/build.js').Build,
    resque      = require('./config/resque'),
    mongoose    = require('./config/mongoose');

var ObjectId = require('mongoose').Types.ObjectId; 

var Jobs = {
  succeed:  function (arg, callback) { callback(); },
  fail:     function (arg, callback) { callback(new Error('fail')); },
  build:    function (build, callback) { 
    var buildId       = build.buildId,
        repositoryId  = build.repositoryId,
        tmp_dir, cmds = {};

    console.log('Build called; repositoryId: ' + repositoryId + ' buildId: ' + buildId);

    Repository.findOne({ '_id': new ObjectId(repositoryId) }, function (err, repository) { 
      if(err) throw err;

      console.log('Repository found: ' + repository);

      // Get the build
      var build = repository.builds.id(buildId);

      // Start the build
      build.startedAt = Date.now();
      repository.save(function (err) { if (err) throw err; });

      // setsid: true is giving me "Operation not permitted"
      // do we actually need it though? unclear about clobbering previous sessions...
      var spawn_clone = function(){
        cmds['clone'] = spawn('git', ['clone',repository.url, tmp_dir], {cwd: tmp_dir, setsid: false});
        cmdout.bind(cmds['clone'],'clone',spawn_npm_install);
      };
      
      // Setup the environment
      var spawn_npm_install = function(){
        cmds['npm_install'] = spawn('npm',['install'], {cwd: tmp_dir});
        cmdout.bind(cmds['npm_install'],'npm_install',spawn_make_test);
      };
      var spawn_make_test = function(){
        cmds['make_test'] = spawn('make',['test'], {cwd: tmp_dir});
        cmdout.bind(cmds['make_test'],'make_test');
      };

      // Clone the repo
      tmp_dir = ['/tmp/', 'dripio', repository.owner_name, repository.name, Date.now()].join('_');
      cmds['mkdir'] = spawn('mkdir',['-vp',tmp_dir]);
      cmdout.bind(cmds['mkdir'],'mkdir',spawn_clone);
      
      // Finish the build
      build.finishedAt = Date.now();
      build.completed = true;
      repository.save(function (err) { if (err) throw err; });
    });
    
    console.log('Build finished.');

    callback(build);
    
    var cmdout = {
      bind: function(spawn,name,next) {
        this.stdout(spawn,name);
        this.stderr(spawn,name);
        this.exit(spawn,name,next);
      },
      stdout: function(spawn,name) {
        spawn.stdout.on('data', function (data) { console.log('stdout '+name+' ['+tmp_dir+']: ' + data); });
      },
      stderr: function(spawn,name) {
        spawn.stderr.on('data', function (data) { console.log('stderr '+name+' ['+tmp_dir+']: ' + data); });
      },
      exit: function(spawn,name,next) {
        spawn.on('exit', function (code) {
          console.log('exit '+name+' ['+tmp_dir+'] code: ' + code);
          if(code === 0 && typeof(next) === 'function') {
            console.log('clean exit; calling next()')
            next();
          } else {
            console.log('unclean exit; not progressing to next, typeof: '+typeof(next))
          }
        });
      }
    };
  }
  
};

var worker = resque.worker('builder', Jobs);

worker.on('job', function(worker, queue, job) {
  console.log("Attempting job; worker: " + worker + " queue: " + queue + " job: " + job);
})

worker.start();
