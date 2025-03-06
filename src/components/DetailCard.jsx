import {
  FaBuildingColumns,
  FaLocationDot,
  FaMapLocationDot,
  FaPeopleGroup,
} from "react-icons/fa6";
import { useEffect, useState } from "react";

function DetailCard({ isDetail, data }) {
  const [distance, setDistance] = useState(null);

  // Koordinat Batulicin
  const BATULICIN_LAT = -3.4508179;
  const BATULICIN_LON = 115.7787759;

  useEffect(() => {
    if (data?.latitude && data?.longitude) {
      const jarak = hitungJarak(
        BATULICIN_LAT,
        BATULICIN_LON,
        data.latitude,
        data.longitude
      );
      setDistance(jarak.toFixed(2)); // Simpan dengan 2 desimal
    }
  }, [data]);

  function hitungJarak(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius bumi dalam km
    const dLat = toRadian(lat2 - lat1);
    const dLon = toRadian(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadian(lat1)) *
        Math.cos(toRadian(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Jarak dalam km
  }

  function toRadian(deg) {
    return (deg * Math.PI) / 180;
  }

  if (!isDetail || !data) return null;

  return (
    <div
      className={`w-[387px] h-dvh absolute z-[9999] ${
        isDetail ? "left-0" : "-left-full"
      } bg-white transition-all duration-300 ease-in-out`}
    >
      <img
        src={
          data.photo_url?.startsWith("http")
            ? data.photo_url
            : import.meta.env.VITE_IMAGE_URL + data.photo_url
        }
        alt=""
        className="w-full h-[215px] mb-3.5"
      />
      <div className="px-6">
        <h1 className="text-2xl mb-5">{data.place_name || ""}</h1>
        <div className="flex flex-col gap-3.5 mb-8">
          <div className="flex gap-2.5 text-sm">
            <FaLocationDot size={19} className="flex-shrink-0" /> Kecamatan{" "}
            {data.subdistrict || ""}
          </div>
          <div className="flex gap-2.5 text-sm overflow-ellipsis">
            <FaMapLocationDot size={19} className="flex-shrink-0" />{" "}
            {data.location || ""}
          </div>
          <div className="flex gap-2.5 text-sm">
            <FaBuildingColumns size={19} className="flex-shrink-0" />{" "}
            {distance ? `${distance} Km dari Batulicin` : "Menghitung..."}
          </div>
          <div className="flex gap-2.5 text-sm">
            <FaPeopleGroup size={19} className="flex-shrink-0" />{" "}
            {data.ctr || "0"} Kunjungan
          </div>
        </div>

        <div className="flex flex-col gap-3 mb-8">
          <h1 className="text-xl">Deskripsi</h1>
          <span className="text-xs">{data.description || ""}</span>
        </div>

        <div className="flex flex-col gap-3 mb-4">
          <h1 className="text-xl">Foto & Video</h1>
        </div>
      </div>
    </div>
  );
}

export default DetailCard;
