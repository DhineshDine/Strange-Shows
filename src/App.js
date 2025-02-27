import React from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Food from './pages/Food';
import BookTicketsPage from './pages/Book Ticket'; // Rename imported component
import MovieDetails from './pages/MovieDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function BookTickets() {
  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <h1 className="text-4xl font-bold text-yellow-500">Book Your Tickets</h1>
      <p>Select your movie, theater, and showtime.</p>
    </div>
  );
}

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/movie-details/:id" element={<MovieDetails />} />
        <Route path="/book-tickets" element={<BookTickets />} />  {/* Uses local function */}
      </Routes>
    </Router>
  );
};

export default App;
