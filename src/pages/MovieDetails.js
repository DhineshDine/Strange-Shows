import React, { useEffect, useState } from "react";
import axios from "axios";

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/movies")
      .then((response) => setMovies(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h2>Available Movies</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title} - {movie.genre}</li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
