const router = require('express').Router();
const userRoutes = require('./userRoutes');
const uploadRoutes = require('./upload');

router.use('/users', userRoutes);
router.use('/upload', uploadRoutes);

module.exports = router;
