const router = require('express').Router();

const dashboardRoutes = require('./dashboardController');
const userRoutes = require('./userControllers');

router.use('/dashboard', dashboardRoutes);
router.use('/user', userRoutes);

module.exports = router;
