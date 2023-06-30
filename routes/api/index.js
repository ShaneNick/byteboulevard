const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const userRoutes = require('./userRoutes');


router.use('/dashboard', dashboardRoutes);
router.use('/user', userRoutes);
module.exports = router;
