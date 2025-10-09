const Post = require('../models/post');
const User = require('../models/user');

async function repoEditPost(id, title, content) {
    const post = await Post.findById(id);   // 先找到文章
    if (!post) {
      return post;
    }

    post.title = title;
    post.content = content;
    await post.save();

    console.log('Edit post successfully ID:' + id);
}
async function repoGetPost(id) {
    const post = await Post.findById(id);
    console.log("GetPost ID:" + id);
    return post;
}
async function repoDeletePost(id) {
    const result = await Post.findByIdAndDelete(id);
    console.log("Delete Post successfully ID:" + id);
}
async function repoCreatePost(title, content) {
    const post = new Post({ title, content });
    console.log("create ");
    await post.save();
}
module.exports = { repoCreatePost, repoEditPost, repoGetPost, repoDeletePost };