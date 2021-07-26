const dbModel = require('../../models');
const Articles = require('./article');
const Comments = require('./comment');
const Tags = require('./tag');
const Users = require('./user');

module.exports = () => ({
  articles: new Articles(dbModel.Article),
  comments: new Comments(dbModel.Comment),
  tags: new Tags(dbModel.Tag),
  users: new Users(dbModel.User),
});
