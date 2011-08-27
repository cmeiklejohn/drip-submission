var mongoose = require('mongoose'),
    app      = require('../server'),
    url      = app.set('credentials').mongohq.url;

mongoose.connect(url, function(err) { 
  if (err) throw err;
  console.log('Connected to MongoHQ');
});
