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

  async follow(currentUserId, targetUserId) {
    const currentUser = await this.findOneById(currentUserId);
    const targetUser = await this.findOneById(targetUserId);

    const { following = [] } = currentUser;
    if (!following.includes(targetUserId)) following.push(targetUserId);

    const { followedBy = [] } = targetUser;
    if (!followedBy.includes(currentUserId)) followedBy.push(currentUserId);

    await Promise.all([currentUser.save(), targetUser.save()]);
  }

  async unfollow(currentUserId, targetUserId) {
    const currentUser = await this.findOneById(currentUserId);
    const targetUser = await this.findOneById(targetUserId);

    const { following = [] } = currentUser;
    if (following.includes(targetUserId)) {
      currentUser.following = following.filter((id) => !id.equals(targetUserId));
    }

    const { followedBy = [] } = targetUser;
    if (followedBy.includes(currentUserId)) {
      targetUser.followedBy = followedBy.filter((id) => !id.equals(currentUserId));
    }

    await Promise.all([currentUser.save(), targetUser.save()]);
  }

  async addFavorite(userId, articleId) {
    const user = await this.findOneById(userId);
    if (!user.favorites.includes(articleId)) {
      user.favorites.push(articleId);
    }
    return user.save();
  }

  async removeFavorite(userId, articleId) {
    const user = await this.findOneById(userId);
    if (user.favorites.includes(articleId)) {
      user.favorites = user.favorites.filter((id) => !id.equals(articleId));
    }
    return user.save();
  }
};
