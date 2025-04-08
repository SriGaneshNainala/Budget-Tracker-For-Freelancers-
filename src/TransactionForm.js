import React, { useState } from 'react';
import axios from 'axios';

const TransactionForm = ({ userId, onTransactionAdded }) => {
  const [formData, setFormData] = useState({
    type: 'income',
    category: '',
    amount: '',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/transactions', {
        ...formData,
        userId,
        amount: parseFloat(formData.amount)
      });
      onTransactionAdded(response.data);
      setFormData({ type: 'income', category: '', amount: '', description: '' });
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input
        type="text"
        placeholder="Category"
        value={formData.category}
        onChange={(e) => setFormData({...formData, category: e.target.value})}
      />
      <input
        type="number"
        placeholder="Amount"
        value={formData.amount}
        onChange={(e) => setFormData({...formData, amount: e.target.value})}
      />
      <input
        type="text"
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({...formData, description: e.target.value})}
      />
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
