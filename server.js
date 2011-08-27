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
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

var Index = require('./controllers/index.js');
app.get('/', Index.index);

var Repositories = require('./controllers/repositories.js');
app.get('/repositories', Repositories.list);

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
