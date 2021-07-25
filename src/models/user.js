const mongoose = require('mongoose');
const { saltMd5 } = require('../utils/md5');
const baseFields = require('./base');

const schema = new mongoose.Schema({
  ...baseFields,
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    set: (pwd) => saltMd5(pwd),
  },
  bio: {
    type: String,
    default: null,
  },
  image: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model('User', schema);
