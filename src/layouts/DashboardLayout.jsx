import  { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

const DashboardLayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const getTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/wisata":
        return "Data Tempat Wisata";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen flex">
      <AdminSidebar />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
