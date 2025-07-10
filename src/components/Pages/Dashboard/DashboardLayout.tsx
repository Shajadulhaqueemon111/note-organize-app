import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import DashboardNavbar from "./DashboardNavbar";
import { Toaster } from "react-hot-toast";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-y-auto bg-[#f5f9ff]">
        <DashboardNavbar />

        <main className="p-4">
          <Outlet />
          <Toaster />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
