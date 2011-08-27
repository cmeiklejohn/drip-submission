var mongoose = require('mongoose'),
    Schema = mongoose.Schema, 
    ObjectId = Schema.ObjectId;

module.exports.BuildSchema = new Schema({ 
  completed: { type: Boolean, index: true, default: false },
  received_at: { type: Date, default: Date.now }
});

module.exports.Build = mongoose.model('Build', module.exports.BuildSchema);
