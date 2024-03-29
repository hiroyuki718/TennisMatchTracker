// server/server.js

const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Assuming you have a db.js file setting up your PostgreSQL connection

const app = express();

// Enable CORS for your frontend app, make sure to replace the port
// with the port that your frontend is actually running on
app.use(cors({
  origin: 'http://localhost:5173'
}));

const PORT = process.env.PORT || 3001;

app.use(express.json()); // Middleware to parse JSON bodies

// ... your other route configurations

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
