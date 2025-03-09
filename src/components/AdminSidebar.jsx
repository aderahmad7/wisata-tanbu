import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { AiFillHome } from "react-icons/ai";
import { HiClipboardDocument } from "react-icons/hi2";
import { FiLogOut } from "react-icons/fi"; // Import ikon logout

function AdminSidebar() {
  return (
    <div className="max-w-[325px] bg-white shadow-[5px_4px_12px_0px_rgba(0,0,0,0.25)] p-5 flex flex-col h-dvh">
      <Logo size="largeMedium" className="mx-8 mb-5" />
      <ul className=" flex flex-col items-center flex-grow">
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `rounded-[10px] w-[285px] h-[55px] flex items-center ps-7 gap-5 text-lg ${
                isActive ? "bg-[#5DC8FF] text-white" : "bg-white text-[#6A6A6A]"
              }`
            }
          >
            <AiFillHome size={23} />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/wisata"
            className={({ isActive }) =>
              `rounded-[10px] w-[285px] h-[55px] flex items-center ps-7 gap-5 text-lg ${
                isActive ? "bg-[#5DC8FF] text-white" : "bg-white text-[#6A6A6A]"
              }`
            }
          >
            <HiClipboardDocument size={23} />
            <span>Wisata</span>
          </NavLink>
        </li>
      </ul>
      <ul className="flex flex-col items-center">
        <li className="mt-auto">
          <NavLink
            to="/"
            className="rounded-[10px] w-[285px] h-[55px] flex items-center justify-center gap-3 text-lg bg-red-400 text-white"
          >
            <FiLogOut size={23} />
            <span>Logout</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
