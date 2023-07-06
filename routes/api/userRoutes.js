const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userControllers');

router.route('/signup')
  .get((req, res) => res.render('signup'))
  .post(userController.signup);

router.route('/login') 
  .get((req, res) => res.render('login'))
  .post(userController.login);

router.route('/logout')
  .post(userController.logout);

module.exports = router;
