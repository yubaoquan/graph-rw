const { MongoDataSource } = require('apollo-datasource-mongodb');

module.exports = class Tag extends MongoDataSource {
  getTags() {
    return this.model?.find();
  }
};
