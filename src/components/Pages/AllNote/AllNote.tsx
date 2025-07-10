/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaFilter, FaTrash, FaEye, FaEdit } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { ScaleLoader } from "react-spinners";
import debounce from "lodash.debounce";
import Swal from "sweetalert2";
import { useAuth } from "../AuthProvider/AuthContext";
const AllNote = () => {
  const { user } = useAuth();
  const userId = user?._id;
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchNotes = async (search: string, categoryValue: string) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("AccessToken does not exist");
        return;
      }

      const res = await axios.get(
        "https://note-organize-app-backend.vercel.app/api/v1/notes",
        {
          params: {
            search,
            category: categoryValue,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotes(res.data?.data || []);
    } catch (err) {
      console.error("Error fetching notes", err);
      toast.error("Failed to load notes.");
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = useCallback(
    debounce((searchValue: string, categoryValue: string) => {
      fetchNotes(searchValue, categoryValue);
    }, 500),
    []
  );

  useEffect(() => {
    debouncedFetch(searchTerm, category);
  }, [searchTerm, category]);

  const handleDelete = async (_id: any) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        const token = await localStorage.getItem("accessToken");
        if (!token) {
          toast.error("localstorage does not token");
        }
        const res = await axios.delete(
          `https://note-organize-app-backend.vercel.app/api/v1/notes/${_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status == 200) {
          toast.success("note deleted successfully");

          setNotes((prev: any) => prev.filter((item: any) => item._id !== _id));
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
        All Notes
      </h1>

      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="relative flex-1 min-w-[220px]">
          <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, content, or category"
            className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="relative w-44">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="appearance-none w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="work">Creativity</option>
            <option value="ideas">Ideas</option>
            <option value="todo">To-Do</option>
            <option value="important">Important</option>
          </select>
          <FaFilter className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-400" />
        </div>

        <div>
          <Link to="/dashboard/create-note">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out">
              + Create Note
            </button>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <ScaleLoader color="#2cabab" height={35} />
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {notes.filter((note: any) => note.userId === userId).length > 0 ? (
            notes
              .filter((note: any) => note.userId === userId)
              .map((note: any) => (
                <div
                  key={note._id}
                  className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition duration-300 relative"
                >
                  <img className="h-20 w-25 mb-2" src={note.image} alt="Note" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {note.title}
                  </h3>
                  <p className="text-gray-600 mb-3 line-clamp-3">
                    {note.content}
                  </p>

                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full">
                      {note.category}
                    </span>
                    <span>
                      Date:{" "}
                      {new Date(note.createdAt).toISOString().slice(0, 10)}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 flex gap-3">
                    <Link to={`/dashboard/edit-note/${note._id}`}>
                      <button
                        title="View"
                        className="text-blue-500 hover:text-blue-700 transition"
                        onClick={() => console.log("View", note._id)}
                      >
                        <FaEye />
                      </button>
                    </Link>

                    <Link to={`/dashboard/edit-note/${note._id}`}>
                      <button
                        title="Edit"
                        className="text-green-500 hover:text-green-700 transition"
                      >
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      title="Delete"
                      className="text-red-500 hover:text-red-700 transition"
                      onClick={() => handleDelete(note._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))
          ) : (
            <p className="text-gray-500 col-span-2">No notes found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AllNote;
