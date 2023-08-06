const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { username, password } = require('./config');
const blogRoutes = require('./routes/blogRoutes')

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = `mongodb+srv://${username}:${password}@cluster0.b9ekjnc.mongodb.net/net-ninja-node-course`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // parses url-encoded data
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use(blogRoutes)

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

