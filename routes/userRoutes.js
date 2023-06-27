const express = require('express');
const router = express.Router();
const { UserController } = require('.');

// Route for user registration
router.post('/signup', UserController.register);

// Route for user login
router.post('/login', UserController.login);

// Route for user logout
router.post('/logout', UserController.logout);

module.exports = router;
