import React from "react";

const ModalDetailWisata = ({ isOpen, onClose, data, onEdit, onDelete }) => {
  if (!isOpen || !data) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol Close (X) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 bg-white rounded-full p-2 shadow-lg z-50"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Gambar */}
        <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden mb-6">
          <img
            src={
              data.photo_url?.startsWith("http")
                ? data.photo_url
                : import.meta.env.VITE_IMAGE_URL + data.photo_url
            }
            alt={data.place_name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/300x200?text=No+Image";
            }}
          />
        </div>

        {/* Informasi Tempat Wisata */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-800">
            {data.place_name}
          </h3>

          <div className="flex items-center text-gray-600">
            <svg
              className="h-5 w-5 mr-2 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>{data.subdistrict}</span>
          </div>

          <div className="space-y-2">
            <p>
              <strong>Lokasi:</strong> {data.location}
            </p>
            <p>
              <strong>Latitude:</strong> {data.latitude}
            </p>
            <p>
              <strong>Longitude:</strong> {data.longitude}
            </p>
            <p>
              <strong>Jumlah Dikunjungi:</strong> {data.ctr} kunjungan
            </p>
            <p>
              <strong>Deskripsi:</strong> {data.description}
            </p>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition duration-200"
          >
            Edit Data
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-200"
          >
            Hapus Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDetailWisata;
