"use client";
import React, { useState } from "react";
import ReflectiveButton from "@/components/ui/reflective-button";
import { postAPI } from "@/services/fetchApi";
import MoviesContainer from "./MoviesContainer";
import { ImSpinner2 } from "react-icons/im";
import { useToast } from "@/hooks/use-toast";

function CreateMovie() {
  const [newMovie, setNewMovie] = useState({ title: "", content: "" });
  const [movies, setMovies] = useState([]);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const createMovie = async () => {
    try {
      setIsLoading(true);
      const data = await postAPI("/movies/createMovie", newMovie);
      if (data && data.success) {
        toast({
          description: "Filminiz eklendi!",
        });
        setMovies((prevMovies) =>
          Array.isArray(prevMovies) ? [...prevMovies, data.data] : [data.data]
        );
        setNewMovie({ title: "", content: "" });
      } else {
        toast({
          variant: "destructive",
          description: `Film eklenemedi! ${data ? data.error : "Unknown error"}`,
        });
      }
    } catch (error) {
      console.error("Error creating movie note:", error);
      toast({
        variant: "destructive",
        description: `Film eklenemedi! ${error.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mb-7 flex justify-center items-center border-[2px] border-blue-400 h-16 rounded-xl p-4">
        <input
          type="text"
          placeholder="Movie Title"
          value={newMovie.title}
          onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
          className="outline-none h-12 rounded-md px-2 py-1 mr-2 focus:border-yellow-300 focus:border-[2px]"
        />
        <input
          type="text"
          placeholder="Content"
          value={newMovie.content}
          onChange={(e) => setNewMovie({ ...newMovie, content: e.target.value })}
          className="outline-none h-12 rounded-md px-2 py-1 mr-5 focus:border-yellow-300 focus:border-[2px]"
        />
        <ReflectiveButton
          onClick={createMovie}
          className="bg-blue-400 h-10 text-white font-bold px-5 rounded-xl"
        >
          ADD
        </ReflectiveButton>
      </div>
      {isLoading ? (
        <div className="text-gray-500 rounded-full animate-spin justify-center flex ">
          <ImSpinner2 />
        </div>
      ) : (
        <MoviesContainer movies={movies} setMovies={setMovies} />
      )}
    </div>
  );
}

export default CreateMovie;