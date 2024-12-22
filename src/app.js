
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const quizRoutes = require('./routes/quizRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use('/api', quizRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
  //useNewUrlParser: true,
  //useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Database connection error:', err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;
    