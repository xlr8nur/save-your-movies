import { create } from 'zustand'

const useStore = create((set) => ({
  movies: [],
  addMovie: (movie) => set((state) => ({ 
    movies: [...state.movies, movie] 
  })),
  updateMovie: (updatedMovie) => set((state) => ({
    movies: state.movies.map((movie) =>
      movie.id === updatedMovie.id ? updatedMovie : movie
    ),
  })),
  removeMovie: (id) => set((state) => ({
    movies: state.movies.filter((movie) => movie.id !== id),
  })),
  setMovies: (movies) => set({ movies }),
}))

export default useStore;