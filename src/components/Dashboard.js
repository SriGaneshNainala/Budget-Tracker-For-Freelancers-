import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = ({ userId }) => {
  const [transactions, setTransactions] = useState([]);
  
  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await axios.get(`http://localhost:5000/api/transactions/${userId}`);
      setTransactions(response.data);
    };
    fetchTransactions();
  }, [userId]);

  const chartData = {
    labels: ['Income', 'Expenses'],
    datasets: [{
      label: 'Amount ($)',
      data: [
        transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0),
        transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
      ],
      backgroundColor: ['#36A2EB', '#FF6384']
    }]
  };

  return (
    <div>
      <h2>Budget Overview</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default Dashboard;
