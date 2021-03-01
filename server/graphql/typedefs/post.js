const { gql } = require('apollo-server');

module.exports = gql`

  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: Date!
    comments: [Comment!]!
    commentsCount: Int!
    likes: [Like!]!
    likesCount: Int!
  }

  type Comment {
    id: ID!
    body: String!
    username: String!
    createdAt: Date!
  }

  type Like {
    id: ID!
    username: String!
    createdAt: Date!
  }

  extend type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }

  extend type Mutation {
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }

  extend type Subscription {
    newPost: Post!
  }

`;
