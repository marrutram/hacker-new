var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clientSchema = new Schema({
  created_at: 'string' ,
  title: 'string' ,
  url: 'string',
  author: 'string',
  points: 'string',
  story_text: 'string',
  comment_text: 'string',
  num_comments: 'string',
  story_id: 'string',
  story_title: 'string',
  story_url: 'string',
  parent_id: 'string',
});

module.exports = mongoose.model('Articles', clientSchema);
