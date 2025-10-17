const router = require("express").Router();
const Post = require('../models/post');
const repofc = require('./repository');
// posts create & edit & delete

// post get
router.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json({ posts });
    console.log('Posts retrieved successfully');
  } catch (err) {
    res.status(500).send('Error retrieving posts');
  }
});

router.get('/posts/:id', async (req, res) => {
  const {id} = req.params;
  const post = await repofc.repoGetPost(id);
  if (!post) return res.status(404).send('文章不存在');
  res.render('post', { user: req.user, post });
});

// post edit
router.get('/postedit/:id', async (req, res) => {
  const {id} = req.params;
  const post = await Post.findById(id);
  console.log("EditPost ID:" + id);
  res.render('postedit', { user: req.user, post });
});
router.put('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    await repofc.repoEditPost(id, title, content);
    res.status(200).end();
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving post');
  }
  });

// post delete
router.get('/postdelete/:id', async (req, res) => {
  const {id} = req.params;
  try {
    repofc.repoDeletePost(id);
    res.redirect('/');  
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting post');
  }});

// post create
router.get('/newposts', (req, res) => {
  res.render('newpost', { user: req.user }); 
});
router.post('/posts/add', async (req, res) => {
  const { title, content } = req.body;
  try {
    repofc.repoCreatePost(title, content);
    res.status(201).end();
    console.log('Post added successfully');
  } catch (err) {
    res.status(500).send('Error saving post');
  }
});

module.exports = router;