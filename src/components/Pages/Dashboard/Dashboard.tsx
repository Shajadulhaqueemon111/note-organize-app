import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        Welcome to Your Note Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-linear-65 from-purple-500 to-pink-500 shadow-md rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-white">Total Notes</h2>
          <p className="text-2xl font-bold text-white">120</p>
        </div>
        <div className="bg-linear-65 from-purple-500 to-pink-500 shadow-md rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-white">Categories</h2>
          <p className="text-2xl font-bold text-white">5</p>
        </div>
        <div className="bg-linear-65 from-purple-500 to-pink-500 shadow-md rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-white">Archived Notes</h2>
          <p className="text-2xl font-bold text-white">8</p>
        </div>
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
        <Link to="/dashboard/manage-catagories">
          <button className="px-6 py-3 bg-yellow-200 rounded-full hover:bg-yellow-300 transition">
            🗂️ Manage Categories
          </button>
        </Link>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">🕘 Recent Notes</h2>
        <ul className="space-y-2">
          <li className="bg-white shadow p-4 rounded">
            📝 Shopping List for Sunday
          </li>
          <li className="bg-white shadow p-4 rounded">
            📌 Project Ideas for App
          </li>
          <li className="bg-white shadow p-4 rounded">
            📅 Meeting Notes - July 1
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
