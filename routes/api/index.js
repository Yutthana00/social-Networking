const router = require('express').Router();
// const { model } = require('mongoose');
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

model.exports = router;