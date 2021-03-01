const { gql } = require('apollo-server');

module.exports = gql`

  type User {
    id: ID!
    token: String!
    username: String!
    email: String!
    createdAt: Date!
  }

  extend type Query {
    getUsers: [User]
  }

  input SignupInput {
    username: String!
    password: String!
    passwordConfirm: String!
    email: String!
  }

  extend type Mutation {
    signup(input: SignupInput): User!
    signin(username: String!, password: String!): User!
  }

`;
