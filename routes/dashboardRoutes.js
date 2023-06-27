const express = require('express');
const router = express.Router();
const withAuth = require('../utils/auth');
const { DashboardController } = require('../controllers');

// Route for dashboard
router.get('/', withAuth, DashboardController.getDashboard);

// Route for creating a new blog post
router.post('/post', withAuth, DashboardController.addPost);

// Route for updating an existing blog post
router.put('/post/:id', withAuth, DashboardController.updatePost);

// Route for deleting an existing blog post
router.delete('/post/:id', withAuth, DashboardController.deletePost);

module.exports = router;
