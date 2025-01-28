"use client";
import { deleteAPI, putAPI } from "@/services/fetchApi";
import React, { useState } from "react";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { LuDelete } from "react-icons/lu";
import { IoMdCheckmark } from "react-icons/io";
import { useToast } from "@/hooks/use-toast";

function MovieNoteCard({ movie, setMovies }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMovie, setEditedMovie] = useState({
    title: movie.title,
    content: movie.content,
  });
  const { toast } = useToast();

  const updateMovie = async (id) => {
    try {
      const data = await putAPI(`/movies/updateMovie/?id=${movie.id}`, {
        title: editedMovie.title,
        content: editedMovie.content,
      });

      if (data.success) {
        setMovies((prevMovies) =>
          prevMovies.map((movie) =>
            movie.id === id ? { ...movie, ...editedMovie } : movie
          )
        );
        toast({
          description: "Film başarıyla güncellendi.",
        });
        setIsEditing(false);
      } else {
        console.error("Updating failed:", data.error);
        toast({
          variant: "destructive",
          description: `Film güncellenemedi ! ${data.error}`,
        });
      }
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  const deleteMovie = async (id) => {
    try {
      await deleteAPI(`/movies/deleteMovie?id=${movie.id}`);
      toast({
        description: "Film başarıyla silindi.",
      });
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };
  if (isEditing) {
    return (
      <div className="bg-gray-200 shadow-md shadow-gray-600 my-2 mx-5 flex flex-col rounded-xl w-[15rem] md:w-[22rem] h-56 ">
        <div className="rounded-full m-3 h-10 px-2 w-fit flex justify-items-center bg-blue-300">
          <input
            type="text"
            value={editedMovie.title}
            onChange={(e) =>
              setEditedMovie({ ...editedMovie, title: e.target.value })
            }
            className="px-1 text-xl font-semibold outline-none bg-transparent text-blue-700"
          />
        </div>

        <div className="p-2">
          <textarea
            value={editedMovie.content}
            onChange={(e) =>
              setEditedMovie({ ...editedMovie, content: e.target.value })
            }
            className="w-full h-20 bg-transparent outline-none resize-none text-lg font-medium text-slate-800 "
          />
        </div>
        <div className="flex flex-end mt-auto">
        <div className="flex justify-start mt-auto px-2 pb-2">
          <button
            onClick={() => updateMovie(movie.id)}
            className="bg-blue-400 rounded-full p-2 text-white w-10 h-10 items-center justify-center flex focus:bg-yellow-400"
          >
            <IoMdCheckmark />
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-blue-400 rounded-full ml-2 p-2 text-white w-10 h-10 items-center justify-center flex"
          >
            <LuDelete />
          </button>
        </div>

        <div className="flex ml-auto items-center p-2 text-sm font-medium text-gray-400">
          <p>{movie.updatedAt.slice(0, 10)}</p>
        </div>

        </div>
      </div>
    );
  }

  return (
    <div
      key={movie.id}
      className="bg-gray-100 shadow-md shadow-gray-400 my-2 mx-5 flex flex-col rounded-xl w-[15rem] md:w-[22rem] h-56"
    >
      <div className="overflow-hidden break-words rounded-full m-3 h-10 pt-1 px-3 w-fit justify-items-center bg-blue-300 ">
        <h2 className="text-xl font-semibold text-blue-700">{movie.title}</h2>
      </div>

      <div className="p-3 text-lg font-medium text-slate-800 overflow-hidden break-words">
        <p>{movie.content}</p>
      </div>

      <div className="flex flex-end mt-auto">
        <div className="flex justify-start mt-auto px-2 pb-2">
          <div className="bg-yellow-300 rounded-full p-2 w-10 h-10 items-center justify-center flex">
            <button
              onClick={() => setIsEditing(true)}
              className="text-white font-bold"
            >
              <FaPen />
            </button>
          </div>
          <div className="bg-red-300 rounded-full w-10 ml-2 h-10 items-center justify-center flex">
            <button
              onClick={() => deleteMovie(movie.id)}
              className="text-white font-bold"
            >
              <MdDelete />
            </button>
          </div>
        </div>

        <div className="flex ml-auto items-center p-2 text-sm font-medium text-gray-400">
          <p>{movie.createdAt.slice(0, 10)}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieNoteCard;
