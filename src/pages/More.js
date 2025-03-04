import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;
function More() {
  const [formData, setFormData] = useState({
    tagNumber: '',
    itemName: '',
    typeOfCloth: '',
    size: '',
    price: 0,
    discount: 0,
    stockCount: 0,
    sold: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/items`, formData);
      alert('Item added successfully!');
      console.log('Added item:', response.data);
      // Clear the form after successful submission
      setFormData({
        tagNumber: '',
        itemName: '',
        typeOfCloth: '',
        size: '',
        price: 0,
        discount: 0,
        stockCount: 0,
        sold: false,
      });
    } catch (error) {
      alert('Failed to add item');
      console.error('Error adding item:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Tag Number:
          <input
            type="text"
            name="tagNumber"
            value={formData.tagNumber}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Item Name:
          <input
            type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Type of Cloth:
          <input
            type="text"
            name="typeOfCloth"
            value={formData.typeOfCloth}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Size:
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Discount:
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Stock Count:
          <input
            type="number"
            name="stockCount"
            value={formData.stockCount}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default More;