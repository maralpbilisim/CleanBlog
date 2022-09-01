const express = require('express');
const postController = require('./controllers/postController');
const pageController = require('./controllers/pageController');
const ejs = require('ejs');
const app = express();

const mongoose = require('mongoose');

const methodOverride = require('method-override');

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
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//ROUTES
app.get('/',postController.getAllPosts);
app.get('/posts/:id',postController.getPost);
app.post('/posts',postController.createPost );
app.put('/posts/:id',postController.updatePost);
app.delete('/posts/:id',postController.deletePost);



app.get('/posts/edit/:id',pageController.getEditPage );
app.get('/about',pageController.getAboutPage);
app.get('/addNewPost',pageController.getAddPage );



 const port = 3000;
 app.listen(port, () => {
   console.log(`Server ${port} portunda dinleniyor`);
 });
 