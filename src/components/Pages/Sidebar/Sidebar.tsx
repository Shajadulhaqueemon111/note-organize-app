import { FaStickyNote, FaHome, FaDashcube } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useAuth } from "../AuthProvider/AuthContext";
import { LogOut } from "lucide-react";

const Sidebar = () => {
  const { logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 w-full flex items-center justify-between px-4 py-3 bg-white shadow z-[60]">
        <button onClick={toggleSidebar}>
          {isOpen ? <HiX size={26} /> : <HiMenuAlt3 size={26} />}
        </button>
        <Link
          to="/dashboard"
          className="text-indigo-600 font-bold text-lg flex items-center gap-2"
        >
          <FaDashcube /> Note Dashboard
        </Link>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-[50] md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-white shadow-lg z-[55] transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col justify-between pt-16 md:pt-0`}
      >
        <div className="px-4 py-5 border-b hidden md:block">
          <Link to="/dashboard">
            <button className="text-xl flex gap-2 font-bold text-indigo-600 hover:bg-indigo-100 p-2 rounded-md">
              <FaDashcube /> Note Dashboard
            </button>
          </Link>
        </div>

        <nav className="p-4 space-y-4 text-sm text-gray-700 overflow-y-auto">
          <div className="space-y-2">
            <Link to="/dashboard/all-notes" onClick={toggleSidebar}>
              <button className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-indigo-100 rounded-md">
                <FaStickyNote /> All Notes
                <span className="ml-auto bg-gray-200 px-2 py-0.5 rounded text-xs">
                  3
                </span>
              </button>
            </Link>
            <Link to="/" onClick={toggleSidebar}>
              <button className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-indigo-100 rounded-md">
                <FaHome /> Home
                <span className="ml-auto bg-gray-200 px-2 py-0.5 rounded text-xs">
                  0
                </span>
              </button>
            </Link>
          </div>

          <hr />

          <div className="space-y-1">
            <h4 className="font-semibold text-xs text-gray-400 uppercase tracking-wider flex items-center gap-1">
              <BiSolidCategoryAlt className="text-base" /> Categories
            </h4>
            <div className="pl-4 space-y-1">
              <p className="text-sm flex justify-between">
                <span className="text-indigo-500">●</span> Work
                <span className="text-xs">1</span>
              </p>
              <p className="text-sm flex justify-between">
                <span className="text-green-500">●</span> Personal
                <span className="text-xs">1</span>
              </p>
              <p className="text-sm flex justify-between">
                <span className="text-yellow-500">●</span> Creative
                <span className="text-xs">1</span>
              </p>
            </div>
          </div>
        </nav>

        <div className="border-t px-4 py-3  gap-2">
          {user?.email ? (
            <button
              onClick={logout}
              className="text-sm px-3 py-1.5 bg-red-600 flex text-white rounded hover:bg-red-700 transition"
            >
              <LogOut /> Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="text-sm px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
