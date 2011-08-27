var app = require('../server'),
    Schema = mongoose.Schema, 
    ObjectId = Schema.ObjectId;

var Build = new Schema({ 

});

Build.pre('save', function (next) {
  console.log('Saving build!');
  next();
})
