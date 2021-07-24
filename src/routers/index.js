const articles = require('./articles');
const indexPage = require('./index-page');
const profiles = require('./profiles');
const tags = require('./tags');
const users = require('./users');

module.exports = (app) => {
  app.use(indexPage);
  app.use(articles);
  app.use(profiles);
  app.use(tags);
  app.use(users);
};
