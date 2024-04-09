// File: /src/components/Login.jsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const navigate = useNavigate(); // Hook from react-router-dom to redirect the user after login

  // Update form fields
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const onSubmit = async e => {
    e.preventDefault();
    const { username, password } = formData;

    try {
      // Make sure to replace the URL with the endpoint of your backend server
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      // Handle successful login, such as storing the token and redirecting the user
    } catch (error) {
      console.error('Error during login:', error);
      // Handle errors, such as displaying a message to the user
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={formData.username} onChange={onChange} required />
        
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={onChange} required />
        
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/join">Join now</Link>
      </p>
    </div>
  );
};

export default Login;
