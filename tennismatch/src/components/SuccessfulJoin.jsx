import React from 'react';
import { Link } from 'react-router-dom';

const SuccessfulJoin = () => {
  return (
    <div className="successful-join">
      <h1>Registration Successful!</h1>
      <p>Your account has been created. You can now log in.</p>
      <Link to="/login" className="btn btn-primary">Go to Login</Link>
    </div>
  );
};

export default SuccessfulJoin;
