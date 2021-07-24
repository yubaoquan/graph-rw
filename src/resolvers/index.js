module.exports = {
  Query: {
    async tags(parent, args, { dataSources }) {
      const tags = await dataSources.tags.getTags();
      return tags;
    },
  },
};
