import { AiOutlineSearch } from "react-icons/ai";

function SearchField() {
  return (
    <div className="absolute z-[999] pt-6 pl-9">
      <div className="relative  w-[428px] shadow-[5px_4px_4px_0px_rgba(0,0,0,0.25)]">
        <input
          type="text"
          placeholder="Search"
          className="w-full py-2 px-2.5 border border-[#CBCBCB] rounded-[5px] focus:outline-none bg-white"
        />
        <AiOutlineSearch
          size={22}
          color="#A7A4A4"
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
        />
      </div>
    </div>
  );
}

export default SearchField;
