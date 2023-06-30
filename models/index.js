const router = require('express').Router();

const dashboardRoutes = require('./dashboardRoutes');  // Rename to match the file name
const userRoutes = require('./userRoutes');  // Rename to match the file name

router.use('/dashboard', dashboardRoutes);
router.use('/user', userRoutes);

module.exports = router;
