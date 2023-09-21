const router = require('express').Router();
const userRoutes = require('./userRoutes');
const uploadRoutes = require('./uploadRoutes');
const itemRoutes = require('./itemRoutes');


router.use('/users', userRoutes);
// router.use('/upload', uploadRoutes);
router.use('/item', itemRoutes);

module.exports = router;
