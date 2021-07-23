const articles = require('./articles');
const profiles = require('./profiles');
const tags = require('./tags');
const users = require('./users');

module.exports = (app) => {
  app.use(articles);
  app.use(profiles);
  app.use(tags);
  app.use(users);
};
