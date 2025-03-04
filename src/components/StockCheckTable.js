// components/StockCheckTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;
function StockCheckTable() {
  const [inStockItems, setInStockItems] = useState([]);
  const [soldItems, setSoldItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch in-stock items
  const fetchInStockItems = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stock/in-stock`);
      return response.data;
    } catch (err) {
      throw new Error('Failed to fetch in-stock items');
    }
  };

  // Fetch sold items
  const fetchSoldItems = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stock/sold-items`);
      return response.data;
    } catch (err) {
      throw new Error('Failed to fetch sold items');
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const inStock = await fetchInStockItems();
        const sold = await fetchSoldItems();
        setInStockItems(inStock);
        setSoldItems(sold);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Render loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  // Render error state
  if (error) {
    return <p style={{ color: 'red' }}>Error fetching data: {error}</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      {/* In-Stock Items Table */}
      <h2>In-Stock Items</h2>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr>
            <th>Tag Number</th>
            <th>Item Name</th>
            <th>Type of Cloth</th>
            <th>Price</th>
            <th>Size</th>
            <th>Stock Count</th>
          </tr>
        </thead>
        <tbody>
          {inStockItems.length > 0 ? (
            inStockItems.map((item) => (
              <tr key={item.tagNumber}>
                <td>{item.tagNumber}</td>
                <td>{item.itemName}</td>
                <td>{item.typeOfCloth}</td>
                <td>{item.price}</td>
                <td>{item.size}</td>
                <td>{item.stockCount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No in-stock items available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Sold Items Table */}
      <h2>Sold Items</h2>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Tag Number</th>
            <th>Item Name</th>
            <th>Type of Cloth</th>
            <th>Price</th>
            <th>Size</th>
            <th>Sold Date</th>
          </tr>
        </thead>
        <tbody>
          {soldItems.length > 0 ? (
            soldItems.map((item) => (
              <tr key={item.tagNumber}>
                <td>{item.tagNumber}</td>
                <td>{item.itemName}</td>
                <td>{item.typeOfCloth}</td>
                <td>{item.price}</td>
                <td>{item.size}</td>
                <td>{new Date(item.soldDate).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No sold items available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StockCheckTable;