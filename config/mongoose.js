var mongoose = require('mongoose');

mongoose.connect('mongodb://drip:drip2011@staff.mongohq.com:10075/drip', function(err) { 
  if (err) throw err;
  console.log('Connected to MongoHQ');
});
