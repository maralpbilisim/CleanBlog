const express = require('express');
const path = require('path');
const ejs = require('ejs');
const app = express();

const mongoose = require('mongoose');
const Post = require('./models/Post');

//connect DB

mongoose.connect('mongodb://localhost/clean-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


//VİEW ENGİNE
app.set('view engine', 'ejs');

//MİDDLEWARE
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//ROUTES
app.get('/',async (req, res) => {
  const posts= await Post.find({});
  res.render('index',{
    posts
  });
});
app.get('/posts/:id', async(req, res) => {
  // res.render('about');
  const post=await Post.findById(req.params.id)
  res.render('post',{
    post
  })
});


app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/addNewPost', (req, res) => {
  res.render('addNewPost');
});

app.post('/posts', async (req, res) => {
  await Post.create(req.body)
  res.redirect('/')
});


 const port = 3000;
 app.listen(port, () => {
   console.log(`Server ${port} portunda dinleniyor`);
 });
 