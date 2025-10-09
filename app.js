const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const Post = require('./models/post');
const User = require('./models/user');
const postRoutes = require('./config/postRoutes');
const repofc = require('./config/repository');
const MONGODB_URI = "mongodb+srv://Brian:Brianmongodbatls704@cluster0.zrxrtjd.mongodb.net/BrianWeb_20250818?retryWrites=true&w=majority&appName=Cluster0";
const mongodblink = 'mongodb://localhost:27017/BrianWeb_20250818'

// link to mongodb
mongoose.connect(MONGODB_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
}); 
// set up middleware
app.set('view engine', 'ejs');
app.set('json spaces', 2);// 美化 retrurn 的 JSON 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// set routes
app.use('/post', postRoutes);



//  router
app.get('/', async (req, res) => {
  const posts = await Post.find();
  res.render('index');
  // res.sendFile(__dirname + '/views/index.html');
  console.log('Index page rendered');
});



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});