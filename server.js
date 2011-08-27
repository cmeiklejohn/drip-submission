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

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
  app.set('credentials',{redistogo:{
                            password: "af6ea3b7ae7aa630dcb710285fb637a1",
                            port:     9107},
                          mongohq:{
                            url:      "mongodb://drip:drip2011@staff.mongohq.com:10054/drip_development"
                          }
                        });
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
  app.set('credentials',{redistogo:{
                            password: "f03a98f500b5d47431e38db0fea0bfe4",
                            port:     9222},
                          mongohq:{
                            url:      "mongodb://drip:drip2011@staff.mongohq.com:10075/drip"
                          }
                        });
});

var Index = require('./controllers/index.js');
app.get('/', Index.index);

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

var Receiver = require('./controllers/receiver.js');
app.post('/receive', Receiver.receive);

var mongoose = require('./config/mongoose');

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
