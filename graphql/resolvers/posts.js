const Post = require('../../models/Post');
const userAuth = require('../../common/userAuth');

module.exports = {
    Query: {
        getPosts: getPosts,
        getPost: getPost
    },
    Mutations: {
        createPost: createPost,
        deletePost: deletePost
    }
}

async function getPosts() {
    return await Post.find().sort({ createdAt: -1 });
}

async function getPost(_, { postId }) {
    const post = await Post.findById(postId);
    if (!post) {
        throw new Error('Post not found');
    }
    return post;
}

async function createPost(_, { body }, context) {
    const token = userAuth(context);
    const newPost = new Post({
        body,
        username: token.username,
        createdAt: new Date(),
        user: token.id
    });
    const savedPost = await newPost.save();
    return savedPost;
}

async function deletePost(_, { postId }, context) {
    const token = userAuth(context);
    const deletion = await Post.deleteOne({
        _id: postId,
        user: token.id
    });
    return deletion.deletedCount;
}
