const express = require('express');
const path = require('path');
const ejs = require('ejs');
const app = express();

const mongoose = require('mongoose');
const Photo = require('./models/Photo');

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
  const photos= await Photo.find({});
  res.render('index',{
    photos
  });
});


app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add_post', (req, res) => {
  res.render('add_post');
});

app.post('/photos', async (req, res) => { // async - await yapısı kullanacğız.
  await Photo.create(req.body)// body bilgisini Photo modeli sayesinde veritabanında dökümana dönüştürüyoruz.
  res.redirect('/')
});


 const port = 3000;
 app.listen(port, () => {
   console.log(`Server ${port} portunda dinleniyor`);
 });
 