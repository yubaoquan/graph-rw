const { MongoDataSource } = require('apollo-datasource-mongodb');

module.exports = class Article extends MongoDataSource {
  getTags() {
    return this.model?.find();
  }
};
