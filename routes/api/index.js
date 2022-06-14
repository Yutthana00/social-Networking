const router = require('express').Router();
const { Module } = require('module');
// const { model } = require('mongoose');
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;