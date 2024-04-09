// File: /server/server.js

require('dotenv').config(); // Reads your .env file and makes environment variables available
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { Client } = require('pg');
const jwt = require('jsonwebtoken'); // Added for JWT token generation
// process is a global object, no need to require it

const app = express();
const corsOptions = {
  origin: 'http://localhost:5174', // or use process.env.CORS_ORIGIN if you have it set in your .env file
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions)); // Changed to use environment variable for CORS origin
app.use(express.json());
// PostgreSQL client connection setup
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});
client.connect(err => { // Added error handling for database connection
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('connected to database');
  }
});

// Registration route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const user = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    
    if (user.rows.length > 0) {
      const isValid = await bcrypt.compare(password, user.rows[0].hashed_password);
      if (isValid) {
        // User authenticated, create and send token
        const token = jwt.sign({ userId: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // JWT token generation logic
        res.json({ token });
      } else {
        // Passwords don't match
        res.status(400).json({ message: "Invalid credentials." });
      }
    } else {
      // No user found with this username
      res.status(400).json({ message: "User does not exist." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during login.", error: error.message }); // Enhanced error message
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    if (user.rows.length > 0) {
      const isValid = await bcrypt.compare(password, user.rows[0].hashed_password);
      if (isValid) {
        const token = jwt.sign({ userId: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
      } else {
        res.status(401).json({ message: "Invalid credentials." });
      }
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during login." });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
