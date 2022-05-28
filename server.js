// Basic dependencies:
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

// Express Port:
const app = express();
const PORT = process.env.PORT || 3001;

// Middle ware:
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('./routes');

//Connection to MongoDB database:
mongoose.connect(
    process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/social-linkup-api",
    {
        useNewUrlParser: true,
        // checking network connection
        useUnifiedTopology: true,
    }
);

// Log mongo:
mongoose.set('debug, true');

// Server listening response:
app.listen(PORT, () => console.log('Connection is live on:${PORT}'));