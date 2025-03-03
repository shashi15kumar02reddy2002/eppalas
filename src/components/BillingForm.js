import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BillingForm() {
  const [tagNumber, setTagNumber] = useState('');
  const [billItems, setBillItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Debugging: Log tagNumber changes
  useEffect(() => {
    console.log("Tag Number:", tagNumber);
  }, [tagNumber]);

  // Fetch item details from backend when user presses Enter
  const fetchItemDetails = async () => {
    if (!tagNumber.trim()) {
      alert("Please enter a Tag Number.");
      return;
    }

    try {
      console.log("Fetching item:", tagNumber);

      const response = await axios.get(`http://localhost:5000/items/item/${String(tagNumber)}`); // Ensure correct API URL
      console.log("API Response:", response.data);

      const item = response.data;

      // Check if the item is already in the bill
      const isDuplicate = billItems.some((billItem) => billItem.tagNumber === item.tagNumber);
      if (isDuplicate) {
        alert('Item is already added to the bill');
        return;
      }

      // Add item to the bill summary
      setBillItems([...billItems, item]);
      setTotalAmount(prevTotal => prevTotal + item.price);

      // Clear the input field
      setTagNumber('');
    } catch (error) {
      console.error("Error fetching item:", error.response?.data || error.message);
      alert('Item not found or out of stock');
    }
  };

  // Handle Enter key press inside the input field
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      fetchItemDetails();
    }
  };

  // Sell all items in the bill
  const sellItems = async () => {
    if (billItems.length === 0) {
      alert("No items to sell.");
      return;
    }

    try {
      const tagNumbers = billItems.map(item => item.tagNumber);
      console.log("Selling items:", tagNumbers);

      const response = await axios.post(`http://localhost:5000/stock/sell-multiple`, { tagNumbers });
      console.log("Sell Response:", response.data);

      alert('All items sold successfully!');

      // Clear bill summary after selling
      setBillItems([]);
      setTotalAmount(0);
    } catch (error) {
      console.error("Sell Error:", error.response?.data || error.message);
      alert(`Failed to sell items: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Billing Form</h2>

      {/* Input field to enter the tag number */}
      <input
        type="text"
        placeholder="Enter Tag Number"
        value={tagNumber}
        onChange={(e) => setTagNumber(e.target.value)}
        onKeyPress={handleKeyPress}  // Calls fetchItemDetails when Enter is pressed
      />
      <button onClick={fetchItemDetails}>Enter</button>

      {/* Bill Summary Table */}
      <h3>Bill Summary</h3>
      <table border="1">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Type of Item</th>
            <th>Tag Number</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {billItems.length > 0 ? (
            billItems.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.itemName}</td>
                <td>{item.tagNumber}</td>
                <td>₹{item.price}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No items added to the bill.</td>
            </tr>
          )}
        </tbody>
      </table>

      <h4>Total Amount: ₹{totalAmount}</h4>

      {/* Sell Button */}
      <button onClick={sellItems} style={{ backgroundColor: 'red', color: 'white', padding: '10px', marginTop: '10px' }}>
        Sell All Items
      </button>
    </div>
  );
}

export default BillingForm;
