const mongoose = require('mongoose');
const baseFields = require('./base');

const schema = new mongoose.Schema({
  ...baseFields,
  title: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Tag', schema);
