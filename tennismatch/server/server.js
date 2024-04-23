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
  origin: 'http://localhost:5173', // Adjust this to match your frontend's origin
  credentials: true, // This is important for cookies, authorization headers with HTTPS
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

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

// Registration route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    
    if (userExists.rows.length > 0) {
      // User already exists, return an error
      return res.status(400).json({ message: "User already exists." });
    } else {
      // No user found, proceed with registration
      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
      // Insert the new user into the database
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

// Add this endpoint to serve user data
app.get('/api/players', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM users;');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: "Server error while fetching users." });
  }
});

// Endpoint to delete a user by ID
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Assuming you have authentication and authorization middleware to protect this route
    const result = await client.query('DELETE FROM users WHERE id = $1 RETURNING *;', [id]);
    if (result.rowCount > 0) {
      res.json({ message: "User deleted successfully." });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: "Server error while deleting user." });
  }
});

app.post('/api/submit-score', async (req, res) => {
  const { playerId, matchId, score } = req.body;

  try {
    // Insert score submission logic here. Example:
    const result = await client.query('INSERT INTO scores(player_id, match_id, score) VALUES($1, $2, $3) RETURNING *;', [playerId, matchId, score]);
    res.json({ message: "Score submitted successfully.", submittedScore: result.rows[0] });
  } catch (error) {
    console.error('Error submitting score:', error);
    res.status(500).json({ message: "Server error while submitting score." });
  }
});

// Apply the middleware to a route
app.get('/api/protected-route', verifyToken, (req, res) => {
  res.json({ message: "Welcome to the protected route!" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
