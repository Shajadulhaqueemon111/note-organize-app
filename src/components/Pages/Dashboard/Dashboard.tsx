import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthContext";

export interface INote {
  _id: string;
  title: string;
  image: string;
  content: string;
  category: string;
  isArchived: boolean;
  isDeleted: boolean;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const userId = user?._id;
  const [notes, setNotes] = useState<INote[]>([]);

  const fetchNote = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("Token does not exist");
        return;
      }

      const res = await axios.get(
        "https://note-organize-app-backend.vercel.app/api/v1/notes",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotes(res.data?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNote();
  }, []);

  const userNotes = notes.filter((note) => note.userId === userId);
  const totalNotes = userNotes.length;
  const uniqueCategories = [...new Set(userNotes.map((note) => note.category))];
  const totalCategories = uniqueCategories.length;

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-indigo-600 mb-6">
        📒 Welcome to Your Note Dashboard
      </h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-indigo-500 rounded-xl p-5 text-center shadow-md text-white">
          <h2 className="text-sm font-medium">Total Notes</h2>
          <p className="text-2xl font-bold mt-1">{totalNotes}</p>
        </div>
        <div className="bg-pink-500 rounded-xl p-5 text-center shadow-md text-white">
          <h2 className="text-sm font-medium">Categories</h2>
          <p className="text-2xl font-bold mt-1">{totalCategories}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
        <Link to="/dashboard/create-note" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-full shadow-md hover:scale-105 transition transform duration-200">
            ➕ Create New Note
          </button>
        </Link>
        <Link to="/dashboard/all-notes" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto px-6 py-3 bg-gray-100 text-gray-800 font-medium rounded-full hover:bg-gray-200 transition">
            📁 View All Notes
          </button>
        </Link>
      </div>

      {/* Recent Notes */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          🕘 Recent Notes
        </h2>
        {userNotes.length === 0 ? (
          <p className="text-gray-500">No notes found. Start creating now!</p>
        ) : (
          <ul className="space-y-2">
            {userNotes.slice(0, 3).map((note, index) => (
              <li
                key={index}
                className="bg-white border rounded-lg shadow-sm p-4 hover:bg-indigo-50 transition"
              >
                <div className="flex items-center gap-2 font-medium text-indigo-700">
                  📝 {note.title}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
