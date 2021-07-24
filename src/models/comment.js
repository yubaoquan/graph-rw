const mongoose = require('mongoose');
const baseFields = require('./base');

const schema = new mongoose.Schema({
  ...baseFields,
  id: String,
  body: String,
  author: String,
});

module.exports = mongoose.model('Comment', schema);
