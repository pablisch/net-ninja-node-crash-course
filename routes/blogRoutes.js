const express = require('express');
const blogController = require('../controllers/blogController');
const Blog = require('../models/blogs');

const router = express.Router();

router.get('/', blogController.blog_index);

router.get('/create', blogController.blog_create_get);

router.delete('/:id', blogController.blog_delete)

router.get('/:id', blogController.blog_single);

router.post('/', blogController.blog_create_post);

module.exports = router;