var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clientSchema = new Schema({
  story_id: 'string',
});

module.exports = mongoose.model('LogsDeletedArticles', clientSchema);