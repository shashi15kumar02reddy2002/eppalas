import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
    </div>
  );
}

export default Home;
