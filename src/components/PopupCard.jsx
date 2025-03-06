import { FaLocationDot, FaPeopleGroup } from "react-icons/fa6";
import { updateView } from "../services/api"; // Import API updateView

function PopupCard({
  image,
  title,
  location,
  view,
  setIsDetail,
  setDataDetail,
  dataDetail,
}) {
  const handleClick = async () => {
    try {
      await updateView(dataDetail.id); // Panggil API untuk update ctr
      const updatedData = { ...dataDetail, ctr: dataDetail.ctr + 1 }; // Tambah ctr di local state
      setDataDetail(updatedData); // Perbarui state di Map.jsx
      setIsDetail((prevIsDetail) => !prevIsDetail);
    } catch (error) {
      console.error("Gagal memperbarui jumlah kunjungan:", error);
    }
  };

  return (
    <div className="flex flex-col w-[300px]">
      <img src={image} alt="Image Wisata" className="w-[300px] h-[175px]" />
      <h3 className="my-2.5 text-lg">{title}</h3>
      <div className="flex items-center gap-2.5 mb-3.5">
        <FaLocationDot size={19} />
        <span className="text-sm m-0">{location}</span>
      </div>
      <div className="flex items-center mb-2.5 gap-2.5">
        <FaPeopleGroup size={19} />
        <span className="text-sm m-0">{dataDetail.ctr} Kunjungan</span>{" "}
        {/* Update langsung */}
      </div>

      <button
        onClick={handleClick}
        className="right-6 bottom-3 bg-[#2EB2C2] rounded-[8px] text-white text-sm w-[102px] h-12 self-end cursor-pointer"
      >
        Lihat Detail
      </button>
    </div>
  );
}

export default PopupCard;
