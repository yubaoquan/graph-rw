const { MongoDataSource } = require('apollo-datasource-mongodb');

module.exports = class Comment extends MongoDataSource {
  getTags() {
    return this.model?.find();
  }
};
