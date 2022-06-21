var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var commentSchema = new Schema({
  name: { type: String, required: true },
  rating: { type: Number, min: 0, max: 10, required: true },
  comment: { type: String, required: true },
  howManyBeers: { type: Number, required: true },
});

// Virtual for comments's URL
commentSchema.virtual('url').get(function () {
  return '/home/comment/' + this._id;
});

//Export model
module.exports = mongoose.model('Comment', commentSchema);
