// File: /src/App.jsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserContext } from './UserContext'; // Import the context

import Navigation from './Navigation';
import Home from './components/Home';
import About from './components/About';
import Players from './components/Players';
import Login from './components/Login';
import Join from './components/Join';
import SuccessfulJoin from './components/SuccessfulJoin';
import SuccessfulLogin from './components/SuccessfulLogin';
import Admin from './components/Admin'; // Import the Admin component
import './App.css'; 

const App = () => { const [user, setUser] = useState(null);
  return (
   
    <UserContext.Provider value={{ user, setUser }}>
    <Router>
      
    <div className="container">
        {/* Navigation bar */}
        <Navigation />

        {/* Define the routes for different pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/players" element={<Players />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/join/success" element={<SuccessfulJoin />} />
          <Route path="/login/success" element={<SuccessfulLogin />} />
          <Route path="/admin" element={<Admin />} /> {/* Admin route */}
          {/* You can add more routes here as needed */}
        </Routes>
        </div>
    </Router>
    </UserContext.Provider>
  );
};

export default App;
