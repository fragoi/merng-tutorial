const { gql } = require('apollo-server');

module.exports = gql`
    scalar Date

    type User {
        id: ID!
        token: String!
        username: String!
        email: String!
        createdAt: Date!
    }

    type Post {
        id: ID!
        body: String!
        username: String!
        createdAt: Date!
        comments: [Comment!]!
        likes: [Like!]!
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

    type Query {
        getUsers: [User]
        getPosts: [Post]
        getPost(postId: ID!): Post
    }

    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }

    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
        createComment(postId: ID!, body: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!
        likePost(postId: ID!): Post!
    }
`
