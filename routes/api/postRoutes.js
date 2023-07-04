const express = require('express');
const router = express.Router();
const PostController = require('../../controllers/postController');

// Route for getting all posts
router.get('/', PostController.getPosts);

// Route for creating a new post
router.post('/', PostController.createPost);

// Route for getting a post by id
router.get('/:id', PostController.getPostById);

// Route for updating a post
router.put('/:id', PostController.updatePost);

// Route for deleting a post
router.delete('/:id', PostController.deletePost);

module.exports = router;
