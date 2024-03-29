// File: /src/components/Login.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <form>
        {/* Form inputs for logging in will go here */}
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" required />
<br />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />
<br />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/join">Join now</Link> {/* Ensure Link is imported to use here */}
      </p>
    </div>
  );
};

export default Login;
