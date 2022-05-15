// Basic dependencies required:
const express = request('express');
const mongoose = require('mongoose');

// Express Port:
const app = express();
const PORT = process.env.PORT || 3001;

// Middle ware:
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(require('./routes'));

//Connection to MongoDB database:
mongoose.connect(
    process.env.MONGODB_URL || 'mongodb://localhost...........'
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

// Log mongo:
mongoose.set('debug, true');

// Server listening response:
app.listen(PORT, () => console.log('Connection is live on:${PORT}'));