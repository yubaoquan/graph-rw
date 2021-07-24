const mongoose = require('mongoose');
const baseFields = require('./base');

const schema = new mongoose.Schema({
  ...baseFields,
  slug: String,
  title: String,
  description: String,
  body: String,
  tagList: [String],
  favoritesCount: Number,
  author: String,
});

module.exports = mongoose.model('Article', schema);
