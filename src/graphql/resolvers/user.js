/* eslint-disable no-underscore-dangle */
const { UserInputError } = require('apollo-server-express');
const jwt = require('../../utils/jwt');
const { saltMd5 } = require('../../utils/md5');

module.exports = {
  Query: {
    async tags(parent, args, { dataSources }) {
      const tags = await dataSources.tags.getTags();
      return tags;
    },
    currentUser(parent, args, { user }) {
      return user;
    },
    async getProfile(parent, { userId }, { dataSources, user }) {
      const userFromDb = await dataSources.users.findById(userId);

      return {
        profile: {
          username: userFromDb.username,
          bio: userFromDb.bio,
          image: userFromDb.image,
          following: userFromDb.followedBy.includes(user?._id),
        },
      };
    },
  },

  Mutation: {
    async createUser(parent, { user }, { dataSources }) {
      const { users } = dataSources;

      const [user1, user2] = await Promise.all([
        users.findByEmail(user.email),
        users.findByUsername(user.username),
      ]);

      if (user1) throw new UserInputError('邮箱已存在');
      if (user2) throw new UserInputError('用户名已存在');

      const userData = await users.saveUser(user);
      const token = await jwt.sign({ userId: userData._id });

      return {
        user: {
          ...userData.toObject(),
          token,
        },
      };
    },

    async login(parent, { user }, { dataSources }) {
      const userData = await dataSources.users.findByEmail(user.email);
      if (!userData) throw new UserInputError('邮箱不存在');
      if (saltMd5(user.password) !== userData.password) throw new UserInputError('密码错误');
      const token = await jwt.sign({ userId: userData._id });

      return {
        user: {
          ...userData.toObject(),
          token,
        },
      };
    },

    async updateUser(parent, { user: userInput }, { user, dataSources }) {
      if (userInput.password) {
        userInput.pasword = saltMd5(userInput.password);
      }
      const ret = await dataSources.users.updateUser(user._id, userInput);
      return { user: ret };
    },

    async follow(parent, { userId }, { dataSources, user }) {
      if (user._id.equals(userId)) throw new Error('不能follow自己');

      await dataSources.users.follow(user._id, userId);

      return { success: true };
    },
    async unfollow(parent, { userId }, { dataSources, user }) {
      if (user._id.equals(userId)) throw new Error('不能取关自己');

      await dataSources.users.unfollow(user._id, userId);

      return { success: true };
    },
  },
};
