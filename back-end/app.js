const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();

const HOSTNAME = 'localhost';
const PORT = '27017';
const DB = 'articlesHN2';
const URL = `mongodb://${HOSTNAME}:${PORT}/${DB}`;

mongoose.connect(URL, {useNewUrlParser: true}, (err) => {
    if(err) console.error(err);
    console.log('Connected to Database');
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET', 'PUT', 'POST', 'DELETE', 'OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); 
app.use(methodOverride());

const modelsArticles = require('./models/articles');
const modelsLogsDeletedArticles = require('./models/logsDeletedArticles');
const articles = require('./controllers/articles');
const api = express.Router();

api.route('/articles') 
 .get(articles.findAll)

api.route('/articles/:id') 
 .delete(articles.delete);

app.use('/api', api);

const cronRequest = require('./controllers/synchronization/cronRequest');
cronRequest.cronActive();

// Start server
app.listen(8089, () => {
 console.log('Node server running on http://localhost:8088');
});

