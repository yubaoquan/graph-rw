// const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const { ApolloServer } = require('apollo-server-express');
const dataSources = require('./data-sources');
const schema = require('./schema');

module.exports = async (app) => {
  const server = new ApolloServer({
    schema,
    dataSources,
    plugins: [
      // 打开注释, 本地起graphql页面, 不访问沙箱页
      // ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });
  await server.start();
  server.applyMiddleware({ app });
};
