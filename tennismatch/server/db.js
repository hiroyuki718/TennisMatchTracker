// File: /server/db.js
require('dotenv').config(); // This should be at the top
const { Client } = require('pg');
const bcrypt = require('bcrypt');

// Configure the PostgreSQL client with connection details
const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgres://localhost/tennismatchdb',
});

// Connect to the PostgreSQL client
client.connect();

// Function to create tables
const createTables = async () => {
  const SQL = `
    DROP TABLE IF EXISTS players;
    DROP TABLE IF EXISTS tournaments;
    DROP TABLE IF EXISTS matches;

    CREATE TABLE players (
        player_id SERIAL PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        birth_date DATE NOT NULL,
        country VARCHAR(50) NOT NULL
    );
    
    CREATE TABLE tournaments (
        tournament_id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL
    );
    
    CREATE TABLE matches (
        match_id SERIAL PRIMARY KEY,
        tournament_id INT NOT NULL REFERENCES tournaments(tournament_id),
        date DATE NOT NULL,
        player1_id INT NOT NULL REFERENCES players(player_id),
        player2_id INT NOT NULL REFERENCES players(player_id),
        winner_id INT REFERENCES players(player_id),
        score VARCHAR(255) NOT NULL
    );
  `;
  await client.query(SQL);
};

// Define the user creation function
const createUser = async ({ username, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10); // Changed the salt rounds to 10, which is more secure and commonly used
  const SQL = `
    INSERT INTO users(username, email, hashed_password) VALUES($1, $2, $3) RETURNING *
  `;
  const response = await client.query(SQL, [username, email, hashedPassword]);
  return response.rows[0];
};

// Export the client and functions
module.exports = {
    client,
    createTables,
    createUser,
    // Add other exported functions here
};
