/* eslint-disable max-classes-per-file */
const { SchemaDirectiveVisitor } = require('@graphql-tools/utils');
const { AuthenticationError } = require('apollo-server-core');
const { defaultFieldResolver } = require('graphql');
const { verify } = require('../../utils/jwt');

class AuthDirective extends SchemaDirectiveVisitor {
  // eslint-disable-next-line class-methods-use-this
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async (parent, args, ctx, info) => {
      const { token, dataSources } = ctx;
      if (!token) throw new AuthenticationError('未授权');

      try {
        const decodedData = await verify(token);
        const user = await dataSources.users.findById(decodedData.userId);
        ctx.user = user;
      } catch (e) {
        console.error(e);
        throw new AuthenticationError('未授权');
      }
      const result = await resolve(parent, args, ctx, info);
      return result;
    };
  }
}

module.exports = AuthDirective;
