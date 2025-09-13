const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const Post = require('./models/post');
const User = require('./models/user');
const Project = require('./models/project');

app.set('view engine', 'ejs');
// 美化 retrurn 的 JSON 
app.set('json spaces', 2);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// link to mongodb
mongoose.connect('mongodb://localhost:27017/BrianWeb_20250818').then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
}); 


//  router
app.get('/', async (req, res) => {
  const posts = await Post.find();
  const projects = await Project.find();
  res.render('index');
  // res.sendFile(__dirname + '/views/index.html');
  console.log('Index page rendered');
  // console.log(posts);
});

// posts create & edit & delete
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json({ posts });
    console.log('Posts retrieved successfully');
  } catch (err) {
    res.status(500).send('Error retrieving posts');
  }
});

// post get
app.get('/api/projects', async (req, res) => {
  try {
    const project = await Project.find();
    res.json({ project });
    console.log('Projects retrieved successfully');
  } catch (err) {
    res.status(500).send('Error retrieving posts');
  }
});
app.get('/posts/:id', async (req, res) => {
  const {id} = req.params;
  const post = await Post.findById(id);
  console.log("GetPost ID:" + id);
  // console.log(post);
  if (!post) return res.status(404).send('文章不存在');
  res.render('post', { post });
});

// post edit
app.get('/postedit/:id', async (req, res) => {
  const {id} = req.params;
  const post = await Post.findById(id);
  console.log("EditPost ID:" + id);
  res.render('postedit', { post });
});
app.put('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const post = await Post.findById(id);   // 先找到文章
    if (!post) {
      return res.status(404).send('Post not found');
    }

    post.title = title;
    post.content = content;
    await post.save();

    console.log('Post edit successfully');
    res.json({ success: true })
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving post');
  }
  });

// post delete
app.get('/postdelete/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const result = await Post.findByIdAndDelete(id);
    res.redirect('/');  
} catch (err) {
    console.error(err);
    res.status(500).send('Error deleting post');
  }});
app.get('/projects/:id', async (req, res) => {
  const {id} = req.params;
  const project = await Project.findById(id);
  console.log("Project ID:" + id);
  if (!project) return res.status(404).send('專案不存在');
  res.render('project', { project });
});

app.get('/newposts', (req, res) => {

  res.render('newnew'); 
});

app.post('/posts/add', async (req, res) => {
  const { title, content } = req.body;
  const post = new Post({ title, content });
  try {
    await post.save();
    res.redirect('/');
    console.log('Post added successfully');
  } catch (err) {
    res.status(500).send('Error saving post');
  }
});

app.post('/projects/add', async (req, res) => {
  const { name, description, link } = req.body;
  const project = new Project({ name, description, link });
  try {
    await project.save();
    res.redirect('/');
    console.log('Project added successfully');
  } catch (err) {
    res.status(500).send('Error saving post');
  }
});
app.get('/newnew', (req, res) => {

  res.render('newnew'); 
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});