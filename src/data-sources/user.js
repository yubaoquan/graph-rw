const { MongoDataSource } = require('apollo-datasource-mongodb');

module.exports = class User extends MongoDataSource {
  getTags() {
    return this.model?.find();
  }
};
