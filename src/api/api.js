import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;

// Function to get the token dynamically to prevent stale values
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Function to log in and store the token
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      username,
      password,
    });

    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

// Function to fetch all items
export const fetchItems = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/items`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

// Function to fetch an item by tag number
export const fetchItemByTag = async (tagNumber) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/items/item/${tagNumber}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching item by tag:", error);
    throw error;
  }
};

// Function to increment stock count
export const incrementStock = async (tagNumber) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/stock/increment/${tagNumber}`, {}, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error incrementing stock:", error);
    throw error;
  }
};

// Function to decrement stock count
export const decrementStock = async (tagNumber) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/stock/decrement/${tagNumber}`, {}, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error decrementing stock:", error);
    throw error;
  }
};

// Function to fetch in-stock items
export const fetchInStockItems = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/stock/in-stock`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching in-stock items:", error);
    throw error;
  }
};

// Function to fetch sold items
export const fetchSoldItems = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/stock/sold-items`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching sold items:", error);
    throw error;
  }
};

// Function to generate a bill
export const generateBill = async (tagNumbers) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/billing/bill`, { tagNumbers }, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error generating bill:", error);
    throw error;
  }
};