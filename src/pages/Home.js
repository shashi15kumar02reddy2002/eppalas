import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css'; // Ensure this file exists

function Home({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove auth token
    setIsAuthenticated(false); // Update auth state
    navigate('/login'); // Redirect to login
  };

  return (
    <div className="home-container">
      <h1>Welcome to Eppala's shopping</h1>
    </div>
  );
}

export default Home;
