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

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  extend type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
  }

`;
