import { Link } from "react-router-dom";

const DashboardNavbar = () => {
  return (
    <div>
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
    </div>
  );
};

export default DashboardNavbar;
