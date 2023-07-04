const express = require('express');
const router = express.Router();
const postController = require('../../controllers/postController');

router.route('/test')
  .get((req, res) => {
    res.send('Test route is working');
});

// Route for home page
router.route('/')
  .get(postController.getPosts);

// Route for individual blog posts
router.route('/:id')
  .get(postController.getPostById);

// Route for login
router.route('/login')
  .get((req, res) => {
    console.log("Login route hit");  // Console log to ensure this route is being accessed
    res.render('login');
});

// Route for signup
router.get('/signup', (req, res) => {
    res.render('signup');
});

module.exports = router;
