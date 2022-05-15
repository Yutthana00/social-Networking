const router = require('express').Router();
// const { model } = require('mongoose');
const opinionRoutes = require('./opinionRoutes');
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);
router.use('/opinions', opinionRoutes);

model.export = router;