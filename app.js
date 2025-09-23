const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const Post = require('./models/post');
const User = require('./models/user');
const Project = require('./models/project');
const repofc = require('./repository/repository');
const MONGODB_URI = "mongodb+srv://Brian:Brianmongodbatls704@cluster0.zrxrtjd.mongodb.net/BrianWeb_20250818?retryWrites=true&w=majority&appName=Cluster0";
const mongodblink = 'mongodb://localhost:27017/BrianWeb_20250818'

app.set('view engine', 'ejs');
app.set('json spaces', 2);// 美化 retrurn 的 JSON 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// link to mongodb
mongoose.connect(MONGODB_URI).then(() => {
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
});

// posts create & edit & delete

// post get
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json({ posts });
    console.log('Posts retrieved successfully');
  } catch (err) {
    res.status(500).send('Error retrieving posts');
  }
});

app.get('/posts/:id', async (req, res) => {
  const {id} = req.params;
  const post = await repofc.repoGetPost(id);
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
    await repofc.repoEditPost(id, title, content);
    res.status(200).end();
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving post');
  }
  });

// post delete
app.get('/postdelete/:id', async (req, res) => {
  const {id} = req.params;
  try {
    repofc.repoDeletePost(id);
    res.redirect('/');  
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting post');
  }});


app.get('/newposts', (req, res) => {

  res.render('newnew'); 
});

// post create
app.post('/posts/add', async (req, res) => {
  const { title, content } = req.body;
  try {
    repofc.repoCreatePost(title, content);
    res.status(201).end();
    console.log('Post added successfully');
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