"use client"
import React, { useEffect } from "react"
import MovieNoteCard from "./MovieNoteCard"
import { getAPI } from "@/services/fetchApi"
import useStore from "@/store/index"

function MoviesContainer() {
  const movies = useStore((state) => state.movies)
  const setMovies = useStore((state) => state.setMovies)

  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const data = await getAPI("/movies/getMovies")
        setMovies(data)
      } catch (error) {
        console.error("Error fetching movies:", error)
      }
    }
    
    getAllMovies()
  }, [setMovies])

  return (
    <>
      {Array.isArray(movies) && movies.length > 0 ? (
        <div className="flex flex-wrap gap-5 justify-center items-center mt-5">
          {movies.map((movie, index) =>
            movie && movie.title && movie.content ? (
              <div key={index}>
                <MovieNoteCard movie={movie} />
              </div>
            ) : null
          )}
        </div>
      ) : null}
    </>
  )
}

export default MoviesContainer;