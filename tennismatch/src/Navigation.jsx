// File: /src/components/Navigation.jsx

import React from 'react';
import './App.css'; 
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <div className="navbar">
    <nav>
      <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'space-around' }}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/players">Players</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/join">Join</Link>
        </li>
        {/* You can add more links here as needed */}
      </ul>
    </nav>
    </div>
  );
};

export default Navigation;
