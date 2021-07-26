const mongoose = require('mongoose');
const baseFields = require('./base');

const schema = new mongoose.Schema({
  ...baseFields,
  title: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
  body: {
    type: String,
    default: null,
  },
  tagList: {
    type: [String],
    default: [],
  },
  favoritesCount: {
    type: Number,
    default: 0,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Article', schema);
