const mongoose = require('mongoose');
const Articles = mongoose.model('Articles');
const LogsDeletedArticles = mongoose.model('LogsDeletedArticles');

exports.findAll = (req, res) => {
  Articles.find((err, clients) => {
  if(err) res.send(500, err.message);
    res.status(200).jsonp(clients);
  });
};

exports.delete = (req, res) => {
  Articles.findById(req.body.id, (err, client) => {
    client.remove((err) => {
      if(err) return res.send(500, err.message);
      const logsDeletedArticlesSave = new LogsDeletedArticles({'story_id': client.story_id});
      logsDeletedArticlesSave.save();
      res.json({ message: 'Successfully deleted' });
    });
  });
};
