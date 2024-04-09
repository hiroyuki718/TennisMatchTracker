require('dotenv').config();
const { Client } = require('pg');
const bcrypt = require('bcrypt');

// Sample user data
const sampleUserData = {
  username: 'hiro',
  email: 'hiro@example.com',
  password: 'hiropassword' // In a real scenario, this should be hashed
};

// PostgreSQL client connection setup
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

// Function to insert sample user data
const insertSampleUser = async (userData) => {
  try {
    await client.connect();
    console.log('Connected to database');

    const hashedPassword = await bcrypt.hash(userData.password, 10); // Hash the password

    const insertUserQuery = `
      INSERT INTO users(username, email, hashed_password)
      VALUES($1, $2, $3)
      RETURNING *;
    `;

    const res = await client.query(insertUserQuery, [userData.username, userData.email, hashedPassword]);
    console.log('User inserted:', res.rows[0]);
  } catch (error) {
    console.error('Error inserting user:', error);
  } finally {
    await client.end();
    console.log('Disconnected from database');
  }
};

// Call the function with the sample user data
insertSampleUser(sampleUserData);