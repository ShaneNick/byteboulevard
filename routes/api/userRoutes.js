const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userControllers');

// Route for user signup
router.route('/signup')
  .get((req, res) => res.render('signup'))
  .post(userController.signup);

// Route for user login
router.route('/login') 
  .get((req, res) => res.render('login'))
  .post(userController.login);

// Route for user logout
router.route('/logout')
  .post(userController.logout);

module.exports = router;
