var nko       = require('nko')('+jzq0Dm9hbErZbrq'), 
    express   = require('express'); 

var app = module.exports = express.createServer();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.logger());
  app.use(app.router);
  app.set('view engine', 'jade');
});

app.configure('test', 'development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
  app.set('credentials',{redistogo:{
                            host: 'carp.redistogo.com',
                            password: "44971d14e4eb61cf163bf0af6933b6ef",
                            port:     9245},
                          mongohq:{
                            url:      "mongodb://drip:drip2011@staff.mongohq.com:10054/drip_development"
                          }
                        });
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
  app.set('credentials',{redistogo:{
                            host:     "localhost",
                            port:     6379,
                            password: ''},
                          mongohq:{
                            url:      "mongodb://localhost/drip"
                          }
                        });
});

var Index = require('./controllers/index.js');
app.get('/', Index.index);
app.get('/about', Index.about);

// Blitz.io
app.get('/mu-3775f757-f1a90d82-e1907dc9-8bc0a3c0', function(request, response) { 
  response.send('42');
});

var Repositories = require('./controllers/repositories.js');
app.get('/repositories', Repositories.list);
app.post('/repositories', Repositories.create);
app.get('/repositories/:ownerName', Repositories.list);
app.get('/repositories/:ownerName/:name', Repositories.show);

var Builds = require('./controllers/builds.js');
app.get('/repositories/:ownerName/:name/builds', Builds.list);
app.get('/repositories/:ownerName/:name/builds/:id', Builds.show);

var Receiver = require('./controllers/receiver.js');
app.post('/receive', Receiver.receive);

var mongoose = require('./config/mongoose');

var io                = require('socket.io').listen(app),
    RepositorySchema  = require('./models/repository.js').RepositorySchema;

io.sockets.on('connection', function(socket) {
  RepositorySchema.pre('save', function(next) {
    console.log('socket.io sending repository event');
    socket.emit('repository', { 'repository': this }); 
    next();
  });

  socket.on('build', function (repository, build) {
    console.log('socket.io received build event');

    Repository.findOne({ ownerName: ownerName, name: name }, function (err, repository) { 
      if (err) throw err;

      var build = repository.builds.id(id);

      redis.lrange("builds:" + build.id, 0, -1, function(err, output) {
        if (err) throw err;

        console.log("Retrieved output from redis for build log!");

        build.output = output.join('');

        socket.emit('build', { 'build': this }); 
      });
    });
  });

});

if(!module.parent) {
  app.listen(process.env.NODE_ENV === 'production' ? 80 : 8000, function() {
    console.log('Ready');

    // if run as root, downgrade to the owner of this file
    if (process.getuid() === 0)
      require('fs').stat(__filename, function(err, stats) {
        if (err) return console.log(err)
        process.setuid(stats.uid);
      });

    console.log('Listening on ' + app.address().port);
  });
}
