const { makeExecutableSchema } = require('@graphql-tools/schema');
const resolvers = require('./resolvers');
const typeDefs = require('./type-defs');

module.exports = makeExecutableSchema({ typeDefs, resolvers });
