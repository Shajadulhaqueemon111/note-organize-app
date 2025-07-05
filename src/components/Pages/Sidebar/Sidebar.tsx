import { FaRegStar, FaStickyNote, FaArchive, FaCog } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden p-4 flex justify-between items-center shadow">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
        </button>
        <Link to="/dashboard">
          <h1 className="text-xl font-bold text-indigo-600">MemoCraft</h1>
        </Link>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out md:flex flex-col justify-between`}
      >
        <div>
          {/* Logo */}
          <div className="px-4 py-5 border-b hidden md:block">
            <Link to="/dashboard">
              <button className="text-xl font-bold text-indigo-600 p-2 hover:bg-indigo-100 rounded-md">
                MemoCraft
              </button>
            </Link>
          </div>

          {/* Menu */}
          <nav className="p-4 space-y-4 text-sm text-gray-700">
            <div className="space-y-2">
              <Link to="/dashboard/all-note">
                <button className="flex items-center gap-2 w-full text-left px-2 py-1 hover:bg-indigo-100 rounded-md">
                  <FaStickyNote /> All Notes
                  <span className="ml-auto bg-gray-200 px-2 py-0.5 rounded text-xs">
                    3
                  </span>
                </button>
              </Link>
              <Link to="/dashboard/favorite-note">
                <button className="flex items-center gap-2 w-full text-left px-2 py-1 hover:bg-indigo-100 rounded-md">
                  <FaRegStar /> Favorites
                  <span className="ml-auto bg-gray-200 px-2 py-0.5 rounded text-xs">
                    0
                  </span>
                </button>
              </Link>
              <button className="flex items-center gap-2 w-full text-left px-2 py-1 hover:bg-indigo-100 rounded-md">
                <FaArchive /> Archived
                <span className="ml-auto bg-gray-200 px-2 py-0.5 rounded text-xs">
                  0
                </span>
              </button>
            </div>

            <hr />

            {/* Categories */}
            <div className="space-y-1">
              <h4 className="font-semibold text-xs text-gray-400 uppercase tracking-wider flex items-center gap-1">
                <BiSolidCategoryAlt className="text-base" /> Categories
              </h4>

              <div className="pl-4 space-y-1">
                <p className="text-sm flex justify-between">
                  <span className="text-indigo-500">●</span> Work{" "}
                  <span className="text-xs">1</span>
                </p>
                <p className="text-sm flex justify-between">
                  <span className="text-green-500">●</span> Personal{" "}
                  <span className="text-xs">1</span>
                </p>
                <p className="text-sm flex justify-between">
                  <span className="text-yellow-500">●</span> Creative{" "}
                  <span className="text-xs">1</span>
                </p>
              </div>
            </div>
          </nav>
        </div>

        {/* Bottom Settings */}
        <div className="border-t px-4 py-3">
          <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600">
            <FaCog /> Settings
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
