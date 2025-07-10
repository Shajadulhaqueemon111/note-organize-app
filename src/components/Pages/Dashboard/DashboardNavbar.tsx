import { Link } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthContext";

const DashboardNavbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="sticky top-0 bg-[#f5f9ff] z-50 shadow-md">
      <div className="flex flex-wrap items-center justify-between px-4 py-3 gap-2">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">N</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            NoteFlow
          </h1>
        </div>

        {/* User Info / Auth Buttons */}
        <div className="flex items-center gap-3 ml-auto">
          {user?.email ? (
            <>
              <img
                src={user.profileImage}
                alt="User Avatar"
                className="w-8 h-8 rounded-full border object-cover"
              />

              <button
                onClick={logout}
                className="text-sm px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="text-sm px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
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
