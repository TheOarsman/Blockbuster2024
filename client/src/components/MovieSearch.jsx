import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { SAVE_MOVIE } from "../utils/mutations";
import { handleSearch } from "../utils/API";

const MovieSearch = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchedMovies, setSearchedMovies] = useState([]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const movieData = await handleSearch(searchInput);

      setSearchedMovies(movieData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Search Movies</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {searchedMovies.length > 0 && (
        <div>
          {searchedMovies.map((movie) => (
            <div key={movie.imdbID}>
              <h3>{movie.Title}</h3>
              <img src={movie.Poster} alt={movie.Title} />
              <p>{movie.Year}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieSearch;