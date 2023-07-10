const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userControllers');
const postController = require('../../controllers/postController');

// Middleware for checking if user is logged in
const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  next();
};

// Test route
router.route('/test')
  .get((req, res) => {
    res.send('Test route is working');
});

// User routes
router.route('/users/signup')
  .get((req, res) => res.render('signup', { logged_in: req.session.logged_in }))
  .post(userController.signup);

router.route('/users/login') 
  .get((req, res) => res.render('login', { logged_in: req.session.logged_in }))
  .post(userController.login);


router.route('/users/logout')
  .post(withAuth, userController.logout);

// Home route
router.route('/')
  .get((req, res) => {
    postController.getPosts(req, res, { logged_in: req.session.logged_in });
  });

// Route for individual blog posts
router.route('/post/:id')
  .get((req, res) => {
    postController.getPostById(req, res, { logged_in: req.session.logged_in });
  });

router.route('/post')
  .post(withAuth, postController.createPost);

router.route('/post/:id')
  .put(withAuth, postController.updatePost)
  .delete(withAuth, postController.deletePost);

module.exports = router;
