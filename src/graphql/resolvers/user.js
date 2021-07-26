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
      console.info('update user', user);
      console.info(userInput);
      if (userInput.password) {
        userInput.pasword = saltMd5(userInput.password);
      }
      const ret = await dataSources.users.updateUser(user._id, userInput);
      return { user: ret };
    },
  },
};
