const Post = require('../../models/Post');

module.exports = {
    Query: {
        getPosts: getPosts
    }
}

async function getPosts() {
    return await Post.find();
}
