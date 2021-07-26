const { makeExecutableSchema } = require('@graphql-tools/schema');
const resolvers = require('./resolvers');
const schemaDirectives = require('./schema-directives');
const typeDefs = require('./type-defs');

module.exports = makeExecutableSchema({ typeDefs, resolvers, schemaDirectives });
