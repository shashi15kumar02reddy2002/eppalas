import axios from 'axios';

const token = localStorage.getItem('token');

// Function to fetch all items
export const fetchItems = async () => {
  try {
    const response = await axios.get('http://localhost:5000/items', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

// Function to fetch an item by tag number
export const fetchItemByTag = async (tagNumber) => {
  try {
    const response = await axios.get(`http://localhost:5000/items/item/${tagNumber}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching item by tag:', error);
    throw error;
  }
};

// Function to increment stock count
export const incrementStock = async (tagNumber) => {
  try {
    const response = await axios.put(`http://localhost:5000/stock/increment/${tagNumber}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error incrementing stock:', error);
    throw error;
  }
};

// Function to decrement stock count
export const decrementStock = async (tagNumber) => {
  try {
    const response = await axios.put(`http://localhost:5000/stock/decrement/${tagNumber}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error decrementing stock:', error);
    throw error;
  }
};

// Function to fetch in-stock items
export const fetchInStockItems = async () => {
  try {
    const response = await axios.get('http://localhost:5000/stock/in-stock', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching in-stock items:', error);
    throw error;
  }
};

// Function to fetch sold items
export const fetchSoldItems = async () => {
  try {
    const response = await axios.get('http://localhost:5000/stock/sold-items', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching sold items:', error);
    throw error;
  }
};

// Function to generate a bill
export const generateBill = async (tagNumbers) => {
  try {
    const response = await axios.post('http://localhost:5000/billing/bill', { tagNumbers }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error generating bill:', error);
    throw error;
  }
};