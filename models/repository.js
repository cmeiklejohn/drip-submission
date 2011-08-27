var app = require('../server'),
    Schema = mongoose.Schema, 
    ObjectId = Schema.ObjectId;

var Repository = new Schema({ 
  uri: { type: String, index: true, validate: function(v) { return v.length > 0 } }
  builds: [Builds]
});

Repository.pre('save', function (next) {
  console.log('Saving repository!');
  next();
})
