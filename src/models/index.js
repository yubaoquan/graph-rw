const mongoose = require('mongoose');
const config = require('../config/config.default');

const Article = require('./article');
const Comment = require('./comment');
const Tag = require('./tag');
const User = require('./user');

mongoose.connect(config.dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Connect fail', err);
});

db.once('open', () => {
  console.info('db connect success');
});

module.exports = { Article, Comment, Tag, User };
