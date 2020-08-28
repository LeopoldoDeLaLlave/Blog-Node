const express = require('express');

const mongoose = require('mongoose');


const { result } = require('lodash');
const { render } = require('ejs');
const blogRoutes = require('./routes/blogRoutes');


// express app
const app = express();

//Conect to MongoDB
const dbURI='mongodb+srv://admin:admin@nodetuts.uqpj3.mongodb.net/note-tuts?retryWrites=true&w=majority';

  mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));



// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

app.use(express.static('public'));

//crea un objeto con los datos del formulario
app.use(express.urlencoded({ extended: true }));



//Routes

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

//Blog routes
app.use('/blogs',blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
