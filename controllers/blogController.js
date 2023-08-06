const Blog = require('../models/blogs');

const blog_index = (req, res) => {
  Blog.find().sort({ createdAt: -1 }) // sorts by newest first
    .then(result => {
      res.render('index', { title: 'All blogs', blogs: result });
    })
    .catch(err => {
      console.log(err);
    });
}

const blog_single = (req, res) => {
  console.log('In GET single blog')
  const id = req.params.id;
  console.log('id to get is', id)
  if (id === ':id') {
    console.log('I am not finding a single blog')
    return
  }
  Blog.findById(id)
    .then(result => {
      console.log('I am finding a single blog')
      res.render('single-blog', { title: result.title, blog: result })
    })
    .catch(err => {
      console.log(err);
  })
}

const blog_create_get = (req, res) => {
  res.render('create', { title: 'Create a new blog' });
}

const blog_create_post = (req, res) => {
  const newBlog = new Blog(req.body);

  newBlog.save()
    .then(result => {
      res.redirect('/blogs');
    })
    .catch (err => {
      console.log(err);
    } );
}

const blog_delete = (req, res) => {
  console.log('In DELETE a blog')
  const id = req.params.id;
  console.log('id to delete is', id)
  
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' })
      return
    })
    .catch(err => {
      console.log(err)
  })
}

module.exports = {
  blog_index,
  blog_single,
  blog_create_get,
  blog_create_post,
  blog_delete,
}