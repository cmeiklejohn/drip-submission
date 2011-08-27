var nko       = require('nko')('+jzq0Dm9hbErZbrq'), 
    express   = require('express'), 
    mongoose  = require('mongoose'),
    resque    = require('coffee-resque');

var app = express.createServer();

// Configuration and environments.
//
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

// Resque
//
resque.connect({ 
  host: 'carp.redistogo.com',
  port: 9198,
  password: '675f1ab0bd9310846989e6ef326a6237'
});

// MongoHQ connection
//
mongoose.connect('mongodb://drip:drip2011@staff.mongohq.com:10075/drip', function(err) { 
  if (err) throw err;
  console.log('Connected to MongoHQ');
});

// TODO: Should be a callback.
console.log('Connected to Redis To Go');

// App routes.
//
app.get('/', function(request, response) { 
  response.render('index');
});

// App port control.
//
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

// Export for testing.
//
module.exports = app;
