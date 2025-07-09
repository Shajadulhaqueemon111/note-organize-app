import { Link } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthContext";

const DashboardNavbar = () => {
  const { user, logout } = useAuth();
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
          {user?.email ? (
            <div className="flex items-center gap-4">
              {/* Avatar Image */}
              <img
                src={user?.profileImage || "/default-avatar.png"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border"
              />

              {/* Logout Button */}
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
