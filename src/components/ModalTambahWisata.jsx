import React, { useState } from "react";
import { addWisata } from "../services/api";
import Swal from "sweetalert2";

const kecamatanList = [
  "Angsana",
  "Batulicin",
  "Karang Bintang",
  "Kuranji",
  "Kusan Hilir",
  "Kusan Hulu",
  "Kusan Tengah",
  "Mantewe",
  "Satui",
  "Simpang Empat",
  "Sungai Loban",
  "Teluk Kepayang",
];

const ModalTambahWisata = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    subdistrict: "",
    place_name: "",
    location: "",
    latitude: "",
    longitude: "",
    description: "",
    photo_url: null,
  });

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      return;
    }

    if (
      (name === "latitude" || name === "longitude") &&
      value &&
      !/^[-]?\d*(\.\d*)?$/.test(value)
    ) {
      return; // Hanya izinkan angka dan desimal
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    try {
      const response = await addWisata(token, formData);

      // Pastikan data yang dikembalikan memiliki format yang benar
      const newWisataData = response.data;

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Tempat wisata berhasil ditambahkan.",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        // Tambahkan ID sementara jika tidak ada ID dari server
        if (!newWisataData.id) {
          newWisataData.id = `temp-${Date.now()}`;
        }

        // Pastikan photo_url sudah benar untuk ditampilkan
        if (
          newWisataData.photo_url &&
          !newWisataData.photo_url.startsWith("http")
        ) {
          // Jika API tidak mengembalikan URL lengkap, gunakan nama file saja
          // URL lengkap akan dibangun saat rendering
        }

        onSubmit(newWisataData); // Kirim data baru ke parent component
        setFormData({
          subdistrict: "",
          place_name: "",
          location: "",
          latitude: "",
          longitude: "",
          description: "",
          photo_url: null,
        });
        onClose();
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text:
          error.response?.data?.message ||
          "Terjadi kesalahan saat menambahkan data.",
        confirmButtonColor: "#d33",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Tambah Tempat Wisata
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Kecamatan
            </label>
            <select
              name="subdistrict"
              value={formData.subdistrict}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option disabled value="">
                Pilih Kecamatan
              </option>
              {kecamatanList.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Nama Tempat
            </label>
            <input
              type="text"
              name="place_name"
              placeholder="Nama Tempat"
              value={formData.place_name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Lokasi
            </label>
            <input
              type="text"
              name="location"
              placeholder="Lokasi"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Latitude
              </label>
              <input
                type="text"
                name="latitude"
                placeholder="Latitude"
                value={formData.latitude}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Longitude
              </label>
              <input
                type="text"
                name="longitude"
                placeholder="Longitude"
                value={formData.longitude}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Foto</label>
            <input
              type="file"
              name="photo_url"
              accept=".jpg,.jpeg,.png"
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Format: JPG, JPEG, atau PNG maks. 5 MB
            </p>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Deskripsi
            </label>
            <textarea
              name="description"
              placeholder="Deskripsi"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              Tambah Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalTambahWisata;
