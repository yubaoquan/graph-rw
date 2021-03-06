const mongoose = require('mongoose');
const baseFields = require('./base');

const schema = new mongoose.Schema({
  ...baseFields,
  articleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article',
    required: true,
  },
  body: {
    type: String,
    default: null,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Comment', schema);
