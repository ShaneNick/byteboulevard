const router = require('express').Router();
const dashboardController = require('../../controllers/dashboardController');

router.route('/')
  .get(dashboardController.getDashboard)
  .post(dashboardController.addPost); 

router.route('/:id')
  .get(dashboardController.getEditPost) 
  .put(dashboardController.updatePost)
  .delete(dashboardController.deletePost);

module.exports = router;
