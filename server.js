// Basic dependencies:
const express = require('express');
const mongoose = require('mongoose');

// Express Port:
const app = express();
const PORT = process.env.PORT || 3001;

// Middle ware:
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(require('./routes');

//Connection to MongoDB database:
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/social-linkup-api', {
// Connect to Heroku    
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

// Log mongo:
mongoose.set('debug', true);

// Server listening response:
app.listen(PORT, () => console.log('Connected to:${PORT}'));