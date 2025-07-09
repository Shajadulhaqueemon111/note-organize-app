/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaFilter } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { ScaleLoader } from "react-spinners";
import debounce from "lodash.debounce";

const AllNote = () => {
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

      const res = await axios.get("http://localhost:5000/api/v1/notes", {
        params: {
          search,
          category: categoryValue,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

      {/* Loader and Notes */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <ScaleLoader color="#2cabab" height={35} />
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {notes.length > 0 ? (
            notes.map((note: any) => (
              <div
                key={note._id}
                className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
                <p className="text-gray-600">{note.content}</p>
                <span className="text-sm text-indigo-500 mt-2 inline-block">
                  {note.category}
                </span>
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
