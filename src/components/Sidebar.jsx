import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Home, MapPin, LogOut } from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { icon: Home, text: "Dashboard", path: "/dashboard" },
    { icon: MapPin, text: "Tempat Wisata", path: "/wisata" },
  ];

  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-blue-700 text-white transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-blue-600">
        {isOpen && <h1 className="text-xl font-bold">My Dashboard</h1>}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-blue-600"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="mt-6">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 hover:bg-blue-600 transition-colors ${
                isActive ? "bg-blue-600" : ""
              }`
            }
          >
            <item.icon size={24} />
            {isOpen && <span className="ml-4">{item.text}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-0 w-full p-4 border-t border-blue-600">
        <button
          onClick={handleLogout}
          className="flex items-center text-white hover:bg-blue-600 w-full px-4 py-2 rounded-lg transition-colors"
        >
          <LogOut size={24} />
          {isOpen && <span className="ml-4">Keluar</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
