const router = require('express').Router();

const userRoutes = require('./userRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const postRoutes = require('./postRoutes');
const homeRoutes = require('./homeRoutes'); 

router.use('/users', userRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/posts', postRoutes);

router.use('/', homeRoutes);  

module.exports = router;
