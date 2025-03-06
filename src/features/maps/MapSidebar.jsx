import { FaBars } from "react-icons/fa6";
import Logo from "../../components/Logo";
import MapNav from "./MapNav";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

function MapSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`bg-[url('/background-maps.png')] bg-cover bg-left-top relative transition-all duration-300 ease-in-out z-50  shadow-[4px_4px_12px_0px_rgba(0,0,0,0.25)] ${
        isOpen ? "w-[326px] px-9" : "w-[103px] px-[18px]"
      }`}
    >
      {isOpen ? (
        <Logo size="medium" className="mx-auto pb-4" />
      ) : (
        <FaBars
          size={39}
          color="#fff"
          className="mx-auto mt-5 mb-14 cursor-pointer transition-all duration-300 ease-in-out"
          onClick={() => setIsOpen(true)}
        />
      )}

      <MapNav isOpen={isOpen} />

      {isOpen && (
        <AiOutlineClose
          size={19}
          color="#fff"
          className="absolute top-3.5 right-3 cursor-pointer transition-all duration-300 ease-in-out"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export default MapSidebar;
