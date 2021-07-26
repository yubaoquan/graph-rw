const { MongoDataSource } = require('apollo-datasource-mongodb');

module.exports = class User extends MongoDataSource {
  findById(userId) {
    return this.findOneById(userId);
  }

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

  /**
   * 第三个参数 new: true 返回更新之后的数据
   */
  updateUser(userId, data) {
    return this.model.findOneAndUpdate({ _id: userId }, data, { new: true });
  }
};
