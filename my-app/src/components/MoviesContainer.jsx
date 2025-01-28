import React, { useEffect, useState } from "react";
import MovieNoteCard from "./MovieNoteCard";
import { getAPI } from "@/services/fetchApi";

function MoviesContainer({ movies, setMovies }) {
  const getAllMovies = async () => {
    try {
      const data = await getAPI("/movies/getMovies");
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    getAllMovies();
  }, []);

  return (
    <>
      {Array.isArray(movies) > 0 ? (
        <div className="flex flex-wrap gap-5 justify-center items-center mt-5">
          {movies.map((movie, index) =>
            movie && movie.title && movie.content ? (
              <div key={index}>
                <MovieNoteCard movie={movie} setMovies={setMovies} />
              </div>
            ) : null
          )}
        </div>
      ) : null}
    </>
  );
}

export default MoviesContainer;
