const { gql } = require('apollo-server');

module.exports = gql`
    type User {
        id: ID!
        token: String!
        username: String!
        email: String!
        createdAt: String!
    }
    type Post {
        id: ID!
        body: String!
        username: String!
        createdAt: String!
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
    }
`
