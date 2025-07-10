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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotes(res.data?.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNote();
  }, []);

  const userNotes = notes.filter((note) => note.userId === userId);

  const totalNotes = userNotes.length;
  const uniqueCategories = [...new Set(userNotes.map((note) => note.category))];
  const totalCategories = uniqueCategories.length;
  // const totalArchived = userNotes.filter((note) => note.isArchived).length;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        Welcome to Your Note Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 shadow-md rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-white">Total Notes</h2>
          <p className="text-2xl font-bold text-white">{totalNotes}</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 shadow-md rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-white">Categories</h2>
          <p className="text-2xl font-bold text-white">{totalCategories}</p>
        </div>
        {/* <div className="bg-gradient-to-r from-purple-500 to-pink-500 shadow-md rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-white">Archived Notes</h2>
          <p className="text-2xl font-bold text-white">{totalArchived}</p>
        </div> */}
      </div>

      <div className="flex flex-wrap gap-4 justify-center mb-10">
        <Link to="/dashboard/create-note">
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow hover:scale-105 transition">
            ➕ Create New Note
          </button>
        </Link>
        <Link to="/dashboard/all-notes">
          <button className="px-6 py-3 bg-gray-200 rounded-full hover:bg-gray-300 transition">
            📁 View All Notes
          </button>
        </Link>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">🕘 Recent Notes</h2>
        <ul className="space-y-2">
          {userNotes.slice(0, 3).map((note, index) => (
            <li key={index} className="bg-white shadow p-4 rounded">
              📝 {note.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
