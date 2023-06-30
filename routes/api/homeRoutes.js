const express = require('express');
const router = express.Router();
const withAuth = require('../utils/auth');  // assuming you have an authentication middleware
const { PostController, CommentController } = require('../../controllers');

// Route for home page
router.get('/', PostController.getPosts);

// Route for individual blog post
router.get('/post/:id', PostController.getPostById);

// Route for submitting a comment on a blog post
router.post('/post/:id/comment', withAuth, CommentController.addComment);

module.exports = router;
