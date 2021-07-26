const articleResolver = require('./article');
const commentResolver = require('./comment');
const userResolver = require('./user');

module.exports = [userResolver, articleResolver, commentResolver];
