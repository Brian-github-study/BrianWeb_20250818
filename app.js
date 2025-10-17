const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const Post = require('./models/post');
const User = require('./models/user');
const postRoutes = require('./config/postRoutes');
const authRoutes = require('./config/authRoutes');
const repofc = require('./config/repository');
const MONGODB_URI = "mongodb+srv://Brian:Brianmongodbatls704@cluster0.zrxrtjd.mongodb.net/BrianWeb_20250818?retryWrites=true&w=majority&appName=Cluster0";
const mongodblink = 'mongodb://localhost:27017/BrianWeb_20250818'
require("./config/passport");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
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
app.use(
  session({
    // secret: process.env.SESSION_SECRET,
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});



//  router
app.use('/post', postRoutes);
app.use('/auth', authRoutes);

app.get('/', async (req, res) => {
  const posts = await Post.find();
  res.render('index', { user: req.user });
  // res.sendFile(__dirname + '/views/index.html');
  console.log('Index page rendered');
});



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});