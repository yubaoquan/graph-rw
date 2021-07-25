const { MongoDataSource } = require('apollo-datasource-mongodb');

module.exports = class User extends MongoDataSource {
  findByEmail(email) {
    return this.model.findOne({ email });
  }

  findByUsername(username) {
    return this.model.findOne({ username });
  }

  saveUser(args) {
    // eslint-disable-next-line new-cap
    const user = new this.model(args);
    return user.save();
  }
};
