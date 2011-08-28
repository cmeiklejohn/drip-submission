var mongoose = require('mongoose'),
    Schema = mongoose.Schema, 
    ObjectId = Schema.ObjectId, 
    date = require('date-utils');

var BuildSchema = require("./build.js").BuildSchema;

module.exports.RepositorySchema = new Schema({ 
  url: { type: String, index: true, validate: function(v) { return v.length > 0 } },
  name: { type: String, index: true, validate: function(v) { return v.length > 0 } },
  ownerName: { type: String, index: true, validate: function(v) { return v.length > 0 } },
  builds: [BuildSchema]
});

module.exports.Repository = mongoose.model('Repository', module.exports.RepositorySchema);

module.exports.Repository.prototype.toJSON = function toJSON () { 
  var obj = this.toObject(); 

  obj.builds.forEach(function(item) { 
    if(item.receivedAt) { 
      item.receivedAt = item.receivedAt.toFormat('YYYY/MM/DD HH:MI:SS');
    }
    if(item.startedAt) { 
      item.startedAt  = item.startedAt.toFormat('YYYY/MM/DD HH:MI:SS');
    }
    if(item.finishedAt) { 
      item.finishedAt = item.finishedAt.toFormat('YYYY/MM/DD HH:MI:SS');
    }
  });

  return obj; 
};
