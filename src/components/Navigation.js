import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/global.css'; // Import global styles

function Navigation({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav>
      <h1>Eppala's</h1>
      <div>
        <button><Link to="/home">Home</Link></button>
        <button><Link to="/billing">Billing</Link></button>
        <button><Link to="/stock-check">Stock Check</Link></button>
        <button><Link to="/more">More</Link></button>
        <button onClick={handleLogout} style={{ backgroundColor: 'red', color: 'white' }}>Logout</button>
      </div>
    </nav>
  );
}

export default Navigation;
