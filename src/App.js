import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Billing from './pages/Billing';
import StockCheck from './pages/StockCheck';
import More from './pages/More';
import Login from './pages/Login';
import Navigation from './components/Navigation';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <>
      {isAuthenticated && <Navigation setIsAuthenticated={setIsAuthenticated} />}
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/home" element={isAuthenticated ? <Home setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />} />
        <Route path="/billing" element={isAuthenticated ? <Billing /> : <Navigate to="/login" />} />
        <Route path="/stock-check" element={isAuthenticated ? <StockCheck /> : <Navigate to="/login" />} />
        <Route path="/more" element={isAuthenticated ? <More /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
