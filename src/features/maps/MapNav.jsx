import { BiBookmark, BiTimeFive } from "react-icons/bi";
import { NavLink } from "react-router";

function MapNav({ isOpen }) {
  return (
    <ul>
      <li
        className={`flex items-center cursor-pointer transition-all duration-300 ease-in-out ${
          isOpen ? "gap-4 mb-4" : "flex-col gap-1.5 mb-9"
        }`}
      >
        <BiBookmark size={isOpen ? 39 : 35} color="#fff" />
        <NavLink className={`${isOpen ? "text-lg" : "text-sm"} text-white`}>
          Disimpan
        </NavLink>
      </li>
      <li
        className={`flex items-center cursor-pointer transition-all duration-300 ease-in-out ${
          isOpen ? "gap-4 mb-4" : "flex-col gap-1.5 mb-9"
        }`}
      >
        <BiTimeFive size={isOpen ? 39 : 35} color="#fff" />
        <NavLink className={`${isOpen ? "text-lg" : "text-sm"} text-white`}>
          Terbaru
        </NavLink>
      </li>
    </ul>
  );
}

export default MapNav;
