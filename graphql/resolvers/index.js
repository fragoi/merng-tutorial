const { GraphQLScalarType, Kind } = require('graphql');

const postsResolvers = require('./posts');
const usersResolvers = require('./users');

const dateScalarType = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize: (date) => date.toISOString(),
    parseValue: (value) => new Date(value),
    parseLiteral(ast) {
        switch (ast.kind) {
            case Kind.STRING: return Date.parse(ast.value);
            case Kind.INT: return new Date(+ast.value);
            default: return null;
        }
    }
});

module.exports = {
    Date: dateScalarType,
    Query: {
        ...usersResolvers.Query,
        ...postsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation
    }
}
