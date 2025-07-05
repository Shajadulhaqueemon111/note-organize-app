import { Link } from "react-router-dom";
import { FaSearch, FaFilter } from "react-icons/fa";

const AllNote = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">All Notes</h1>

      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="relative flex-1 min-w-[220px]">
          <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="search"
            placeholder="Search note title or content"
            className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="relative w-44">
          <select className="appearance-none w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Categories</option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="ideas">Ideas</option>
            <option value="todo">To-Do</option>
            <option value="important">Important</option>
          </select>
          <FaFilter className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Create Note button */}
        <div>
          <Link to="/dashboard/create-note">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out">
              + Create Note
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllNote;
