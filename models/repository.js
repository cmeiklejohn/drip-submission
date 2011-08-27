var mongoose = require('mongoose'),
    Schema = mongoose.Schema, 
    ObjectId = Schema.ObjectId;

var BuildSchema = require("./build.js").BuildSchema;

module.exports.RepositorySchema = new Schema({ 
  url: { type: String, index: true, validate: function(v) { return v.length > 0 } },
  name: { type: String, index: true, validate: function(v) { return v.length > 0 } },
  owner_name: { type: String, index: true, validate: function(v) { return v.length > 0 } },
  builds: [BuildSchema]
});

module.exports.Repository = mongoose.model('Repository', module.exports.RepositorySchema);
