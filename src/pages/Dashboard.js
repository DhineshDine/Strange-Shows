import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Welcome to the Dashboard</h1>
      <nav>
        <ul>
          <li><Link to="/book-tickets">Book Tickets</Link></li>
          <li><Link to="/order-food">Order Food</Link></li>
          <li><Link to="/review-movie">Review Movie</Link></li>
          <li><Link to="/activity-tracker">Personal Activity Tracker</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
