"use client";
import { setup } from "goober";
import React, { useState } from "react";
import { Movies } from "../components/Movies";
import { MoviesContainer } from "../components/MovieContainer";

setup(React.createElement);

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  const searchMovies = async () => {
    if (!query) {
      setError("Please enter a search query");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI_LOCAL}/api/searchMovies?query=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      console.log(data, "data");

      if (response.ok) {
        setMovies(data.Search);
        setError("");
      } else {
        setMovies([]);
        setError(data.error || "Error fetching movies");
      }
    } catch (err) {
      setMovies([]);
      setError("An error occurred while fetching movie data.");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies"
      />
      <button onClick={searchMovies}>Search</button>

      {error && <div style={{ color: "red" }}>{error}</div>}

      <MoviesContainer>
        {movies.length > 0 ? (
          movies.map((movie: any) => <Movies {...movie} key={movie.imdbID} />)
        ) : (
          <p>No movies found.</p>
        )}
      </MoviesContainer>
    </div>
  );
};

export default MovieSearch;
