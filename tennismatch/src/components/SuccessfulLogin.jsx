import React from 'react';
import { Link } from 'react-router-dom';

const SuccessfulLogin = ({ user }) => {
  return (
    <div className="successful-login">
      <h1>Welcome, {user.username}!</h1>
      <p>You have successfully logged in.</p>
      <Link to="/" className="btn btn-primary">Go to Home</Link>
    </div>
  );
};

export default SuccessfulLogin;
