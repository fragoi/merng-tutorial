const { gql } = require('apollo-server');

const date = require('./date');
const post = require('./post');
const user = require('./user');

const root = gql`
  type Query
  type Mutation
  type Subscription
`;

module.exports = [
  root,
  date,
  post,
  user
];
