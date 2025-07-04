import { FaPlus, FaSearch, FaImage } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#f5f9ff] px-4 md:px-8 py-6">
      {/* Top Branding and Sign In */}
      <div className="flex items-center justify-between mb-8 sticky top-0 bg-[#f5f9ff] z-10 py-2">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">N</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            NoteFlow
          </h1>
        </div>

        <div>
          <Link to="/signin">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Sign In
            </button>
          </Link>
        </div>
      </div>

      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-700 mb-4">
          Your Digital Note-Taking Companion
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Organize your thoughts, capture your ideas, and never lose track of
          what matters most. Create beautiful notes with categories, images, and
          powerful search capabilities.
        </p>
      </header>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaPlus className="text-blue-500 text-2xl" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-center mb-2">
            Create & Organize
          </h3>
          <p className="text-center text-gray-600">
            Create notes with rich formatting and organize them with color-coded
            categories.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <div className="flex justify-center mb-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <FaSearch className="text-purple-500 text-2xl" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-center mb-2">
            Search & Filter
          </h3>
          <p className="text-center text-gray-600">
            Find any note instantly with powerful search and category filtering.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <FaImage className="text-green-500 text-2xl" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-center mb-2">Rich Media</h3>
          <p className="text-center text-gray-600">
            Add images to your notes and create visually appealing
            documentation.
          </p>
        </div>
      </div>

      {/* Call to Action Button */}
      <div className="text-center">
        <Link to="/dashboard">
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-lg font-semibold shadow hover:scale-105 transition">
            Get Started Free
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
