const dateScalarType = require('./date');
const postsResolvers = require('./post');
const usersResolvers = require('./user');

module.exports = {
  Date: dateScalarType,
  Post: postsResolvers.Post,
  Query: {
    ...usersResolvers.Query,
    ...postsResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation
  },
  Subscription: {
    ...postsResolvers.Subscription
  }
}
