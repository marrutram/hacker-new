var mongoose = require('mongoose');
const request = require('request');
const lodash = require('lodash');
const Articles = mongoose.model('Articles');
const LogsDeletedArticles = mongoose.model('LogsDeletedArticles');

exports.getApiHn  = () => {
  request('http://hn.algolia.com/api/v1/search_by_date?query=nodejs', { json: true }, (err, res, body) => {
    if(err) console.error(err);
    const resultApi = lodash.get(body, 'hits');
    let storyId = null;
    let clientSave = null;
    lodash.each(resultApi, (value) => {
      storyId = lodash.get(value, 'story_id');
      if (!lodash.isUndefined(storyId)) {
        LogsDeletedArticles.find({'story_id': storyId},(err, clientDelete) => {
          if(err) console.error(err);
          if (lodash.isEmpty(clientDelete)) {
            Articles.findOne({ 'story_id': value.story_id }, (err, clientUpate) => {
              if (!lodash.isEmpty(clientUpate)) {
                clientUpate.created_at = value.created_at;
                clientUpate.title = value.title;
                clientUpate.url = value.url;
                clientUpate.author = value.author;
                clientUpate.points = value.points;
                clientUpate.story_text = value.story_text;
                clientUpate.comment_text = value.comment_text;
                clientUpate.num_comments = value.num_comments;
                clientUpate.story_id = value.story_id;
                clientUpate.story_title = value.story_title;
                clientUpate.story_url = value.story_url;
                clientUpate.parent_id = value.parent_id;
                clientUpate.save();
              } else {
                clientSave = new Articles(value);
                clientSave.save();
              }
            });
          }
        });
      }
    });
  });
};
