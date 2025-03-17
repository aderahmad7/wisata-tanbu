import {
  FaBuildingColumns,
  FaLocationDot,
  FaMapLocationDot,
  FaPeopleGroup,
} from "react-icons/fa6";
import { useEffect, useState, useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";

function DetailCard({ isDetail, setIsDetail, data }) {
  const [distance, setDistance] = useState(null);

  // Koordinat Batulicin
  const BATULICIN_LAT = -3.4508179;
  const BATULICIN_LON = 115.7787759;

  const toRadian = (deg) => (deg * Math.PI) / 180;

  const hitungJarak = useCallback((lat1, lon1, lat2, lon2) => {
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
  }, []);

  useEffect(() => {
    if (data?.latitude && data?.longitude) {
      const jarak = hitungJarak(
        BATULICIN_LAT,
        BATULICIN_LON,
        parseFloat(data.latitude),
        parseFloat(data.longitude)
      );
      setDistance(jarak.toFixed(2));
    }
  }, [data, hitungJarak]);

  const Skeleton = () => (
    <div className="animate-pulse">
      <div className="w-full h-[215px] bg-gray-300 mb-3.5"></div>
      <div className="px-6">
        <div className="h-6 bg-gray-300 w-3/4 mb-5"></div>
        <div className="flex flex-col gap-3.5 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-300 w-full"></div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`w-[387px] h-dvh absolute z-[9999] ${
        isDetail ? "left-0" : "-left-full block"
      } transition-all duration-400 ease-in-out bg-white`}
    >
      <div className="relative">
        {!data ? (
          <Skeleton />
        ) : (
          <>
            <div className="border border-gray-300 rounded-full absolute top-3.5 right-3 cursor-pointer transition-all duration-300 ease-in-out w-6 h-6 bg-white flex items-center justify-center col">
              <AiOutlineClose
                size={19}
                color="#000"
                onClick={() => setIsDetail(false)}
              />
            </div>
            <img
              src={
                data.photo_url?.startsWith("http")
                  ? data.photo_url
                  : `${import.meta.env.VITE_IMAGE_URL}${data.photo_url}`
              }
              alt={data.place_name || "Gambar Tempat Wisata"}
              className="w-full h-[215px] mb-3.5 object-cover"
            />
            <div className="px-6">
              <h1 className="text-2xl mb-5">{data.place_name}</h1>
              <div className="flex flex-col gap-3.5 mb-8">
                <div className="flex gap-2.5 text-sm">
                  <FaLocationDot size={19} className="flex-shrink-0" />
                  Kecamatan {data.subdistrict || ""}
                </div>
                <div className="flex gap-2.5 text-sm overflow-hidden">
                  <FaMapLocationDot size={19} className="flex-shrink-0" />
                  {data.location || ""}
                </div>
                <div className="flex gap-2.5 text-sm">
                  <FaBuildingColumns size={19} className="flex-shrink-0" />
                  {distance ? `${distance} Km dari Batulicin` : "Menghitung..."}
                </div>
                <div className="flex gap-2.5 text-sm">
                  <FaPeopleGroup size={19} className="flex-shrink-0" />
                  {data.ctr || "0"} Kunjungan
                </div>
              </div>

              <div className="flex flex-col gap-3 mb-8">
                <h1 className="text-xl">Deskripsi</h1>
                <span className="text-xs">
                  {data.description || "Tidak ada deskripsi"}
                </span>
              </div>

              <div className="flex flex-col gap-3 mb-4">
                <h1 className="text-xl">Foto & Video</h1>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DetailCard;
