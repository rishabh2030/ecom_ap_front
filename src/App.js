import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './component/auth/Auth';
import Home from './component/home/Home';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
