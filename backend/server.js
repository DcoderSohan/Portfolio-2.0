// Main server file
// This is the entry point of our backend application

require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

// Create Express app
const app = express();

// Middleware
app.use(cors()); // Allow frontend to access API
app.use(express.json()); // Parse JSON data
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Connect to database
connectDB();

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
