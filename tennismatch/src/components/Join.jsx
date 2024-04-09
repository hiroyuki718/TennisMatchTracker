// File: /src/components/Join.jsx

import { useState } from 'react';
import { Link } from 'react-router-dom';

const Join = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { username, email, password, confirmPassword } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== confirmPassword) {
            console.log('Passwords do not match');
            // Add more robust error handling here
            return;
        }
        
        // Replace `http://localhost:3001/register` with your actual backend endpoint URL
        const response = await fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();
        console.log(data);
        // Handle response data, errors, and redirection here
    };

    return (
        <div>
            <h1>Join</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" value={username} onChange={onChange} required />
                <br />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={email} onChange={onChange} required />
                <br />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={password} onChange={onChange} required />
                <br />
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={onChange} required />
                <br />
                <button type="submit">Join</button>
            </form>
            <p>
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
};

export default Join;
