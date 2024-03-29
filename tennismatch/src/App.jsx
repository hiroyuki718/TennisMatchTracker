// File: /src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navigation from './Navigation';
import Home from './components/Home';
import About from './components/About';
import Players from './components/Players';
import Login from './components/Login';
import Join from './components/Join';

const App = () => {
  return (
    <Router>
      <div>
        {/* Navigation bar */}
        <Navigation />

        {/* Define the routes for different pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/players" element={<Players />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          {/* You can add more routes here as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
