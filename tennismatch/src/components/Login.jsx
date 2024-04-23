// File: /src/components/Login.jsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState(''); // Added state for error handling

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
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include'  // Needed if your backend sets HttpOnly cookies
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        // Handle successful login, such as storing the token and redirecting the user
        navigate('/dashboard'); // Redirect to dashboard or another route on successful login
      } else {
        // Handle different types of errors based on status code or error message from server
        if (response.status === 401) {
          setError('Invalid credentials.'); // Specific message for invalid credentials
        } else if (response.status === 404) {
          setError('User not found.');
        } else {
          setError('Login failed: ' + data.message || 'An error occurred.');
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Login failed: ' + error.message); // Generic error message for network issues or other errors
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
      {error && <p className="error">{error}</p>} {/* Display error message if any */}
      <p>
        Don't have an account? <Link to="/join">Join now</Link>
      </p>
    </div>
  );
};

export default Login;
