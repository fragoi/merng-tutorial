const { UserInputError } = require('apollo-server');

const Post = require('../../models/Post');
const { authenticate } = require('../../common/security');

async function getPosts() {
    return await Post.find().sort({ createdAt: -1 });
}

async function getPost(_, { postId }) {
    return await _requirePost(postId);
}

async function createPost(_, { body }, context) {
    const token = authenticate(context);
    if (body.trim() === '') {
        throw new UserInputError('Post body is empty');
    }
    const newPost = new Post({
        body,
        username: token.username,
        createdAt: new Date(),
        user: token.id
    });
    const savedPost = await newPost.save();
    context.pubsub.publish('NEW_POST', {
        newPost: savedPost
    });
    return savedPost;
}

async function deletePost(_, { postId }, context) {
    const token = authenticate(context);
    const deletion = await Post.deleteOne({
        _id: postId,
        user: token.id
    });
    return deletion.deletedCount;
}

async function createComment(_, { postId, body }, context) {
    const token = authenticate(context);
    if (body.trim() === '') {
        throw new UserInputError('Comment body is empty');
    }
    const post = await _requirePost(postId);
    post.comments.unshift({
        body,
        username: token.username,
        createdAt: new Date()
    });
    await post.save();
    return post;
}

async function deleteComment(_, { postId, commentId }, context) {
    const token = authenticate(context);
    const post = await _requirePost(postId);
    const commentIndex = post.comments.findIndex(c => c.id === commentId);
    if (commentIndex > -1
        && post.comments[commentIndex].username === token.username) {
        post.comments.splice(commentIndex, 1);
        await post.save();
    }
    return post;
}

async function likePost(_, { postId }, context) {
    const token = authenticate(context);
    const post = await _requirePost(postId);
    const likeIndex = post.likes.findIndex(l => l.username === token.username);
    if (likeIndex > -1) {
        post.likes.splice(likeIndex, 1);
    } else {
        post.likes.push({
            username: token.username,
            createdAt: new Date()
        });
    }
    await post.save();
    return post;
}

function commentsCount(parent) {
    return parent.comments.length;
}

function likesCount(parent) {
    return parent.likes.length;
}

function subscribeNewPost(_, __, { pubsub }) {
    return pubsub.asyncIterator('NEW_POST');
}

function _requirePost(postId) {
    return Post.findById(postId)
        .orFail(() => Error('Post not found'));
}

module.exports = {
    Post: {
        commentsCount,
        likesCount
    },
    Query: {
        getPosts,
        getPost
    },
    Mutation: {
        createPost,
        deletePost,
        createComment,
        deleteComment,
        likePost
    },
    Subscription: {
        newPost: {
            subscribe: subscribeNewPost
        }
    }
}
