import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import image from "../assets/nav-logo.png"; // Adjust path as needed
// import "../styles/Navbar.css"; // Make sure this path is correct

const Navbar = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/movies"); // Adjust API URL if needed
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="nav-logo">
        <Link to="/">
         {/*<img src={image} alt="Alamo Style Logo" className="logo" />*/} 
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="nav-links">
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/login" className="nav-item">Login</Link>
        <Link to="/register" className="nav-item">Register</Link>
        <Link to="/food" className="nav-item">Food</Link>
      </div>

      {/* Movie List in Navbar */}
      <div className="nav-movies">
        <span>Movies:</span>
        {movies.length > 0 ? (
          <ul>
            {movies.map((movie) => (
              <li key={movie._id}>
                <Link to={`/movie/${movie._id}`} className="nav-item">
                  {movie.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading movies...</p>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
