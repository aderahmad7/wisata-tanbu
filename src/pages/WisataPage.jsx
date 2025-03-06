import React, { useState, useEffect } from "react";
import { wisata, deleteWisata } from "../services/api"; // Tambahkan impor deleteWisata
import ModalTambahWisata from "../components/ModalTambahWisata";
import ModalDetailWisata from "../components/ModalDetailWisata";
import ModalEditWisata from "../components/ModalEditWisata";
import Swal from "sweetalert2"; // Pastikan Swal diimpor

const WisataPage = () => {
  const [dataWisata, setDataWisata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedWisata, setSelectedWisata] = useState(null);
  const itemsPerPage = 6;

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Token tidak ditemukan di sessionStorage.");
      const response = await wisata(token);
      setDataWisata(response.data.destination || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTambahWisata = (newData) => {
    if (!newData) {
      fetchData();
      return;
    }

    // Periksa apakah newData memiliki format yang benar
    const wisataItem = newData.data
      ? {
          id: newData.data.id || `temp-${Date.now()}`,
          place_name: newData.data.place_name || "",
          subdistrict: newData.data.subdistrict || "",
          location: newData.data.location || "",
          latitude: newData.data.latitude || "",
          longitude: newData.data.longitude || "",
          description: newData.data.description || "",
          ctr: newData.data.ctr || "0",
          photo_url: newData.data.photo_url || "",
        }
      : newData;

    setDataWisata((prevData) => [wisataItem, ...prevData]);
    setCurrentPage(1);
  };

  const handleEditWisata = (updatedData) => {
    if (!updatedData) {
      fetchData();
      return;
    }

    // Periksa apakah updatedData memiliki format yang benar
    const wisataItem = updatedData.data
      ? {
          id: updatedData.data.id,
          place_name: updatedData.data.place_name || "",
          subdistrict: updatedData.data.subdistrict || "",
          location: updatedData.data.location || "",
          latitude: updatedData.data.latitude || "",
          longitude: updatedData.data.longitude || "",
          description: updatedData.data.description || "",
          ctr: updatedData.data.ctr || "0",
          photo_url: updatedData.data.photo_url || "",
        }
      : updatedData;

    // Update item dalam array dengan ID yang cocok
    setDataWisata((prevData) =>
      prevData.map((item) => (item.id === wisataItem.id ? wisataItem : item))
    );
  };

  const handleDeleteWisata = async (id) => {
    try {
      const token = sessionStorage.getItem("token");

      const result = await Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Data tempat wisata akan dihapus permanen!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        await deleteWisata(token, id);

        Swal.fire({
          icon: "success",
          title: "Terhapus!",
          text: "Data tempat wisata berhasil dihapus.",
          confirmButtonColor: "#3085d6",
        });

        // Update state tanpa item yang dihapus
        setDataWisata((prevData) => prevData.filter((item) => item.id !== id));
        setIsDetailModalOpen(false);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text:
          error.response?.data?.message ||
          "Terjadi kesalahan saat menghapus data.",
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleDetailClick = (wisata) => {
    setSelectedWisata(wisata);
    setIsDetailModalOpen(true);
  };

  const filteredData = dataWisata.filter(
    (item) =>
      item.place_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subdistrict?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
              Data Tempat Wisata
            </h1>
            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari tempat wisata..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200"
              >
                Tambah Wisata
              </button>
            </div>
          </div>

          <ModalTambahWisata
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleTambahWisata}
          />

          {selectedWisata && (
            <>
              <ModalDetailWisata
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
                data={selectedWisata}
                onEdit={() => {
                  setIsDetailModalOpen(false);
                  setIsEditModalOpen(true);
                }}
                onDelete={() => handleDeleteWisata(selectedWisata.id)}
              />

              <ModalEditWisata
                key={selectedWisata.id} // Penting: Tambahkan key untuk memastikan re-render
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={handleEditWisata}
                data={selectedWisata}
              />
            </>
          )}

          {loading ? (
            <div className="text-center py-12 text-gray-500">
              Memuat data...
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">
              Gagal memuat data: {error}
            </div>
          ) : currentItems.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              Tidak ada tempat wisata yang ditemukan.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentItems.map((item) => (
                <div
                  key={item.id || `temp-${Date.now()}-${Math.random()}`}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300"
                >
                  <div className="relative h-48 bg-gray-100 flex justify-center items-center overflow-hidden">
                    <img
                      src={
                        item.photo_url?.startsWith("http")
                          ? item.photo_url
                          : import.meta.env.VITE_IMAGE_URL + item.photo_url
                      }
                      alt={item.place_name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/300x200?text=No+Image";
                      }}
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                      {item.place_name}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-4">
                      <svg
                        className="h-5 w-5 mr-1 text-gray-500"
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
                      <span>{item.subdistrict}</span>
                    </div>
                    <button
                      onClick={() => handleDetailClick(item)}
                      className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium py-2 px-4 rounded-lg transition duration-200"
                    >
                      Lihat Detail
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredData.length > 0 && (
            <div className="flex justify-center mt-8">
              <nav className="flex items-center space-x-1">
                <button
                  onClick={() =>
                    currentPage > 1 && handlePageChange(currentPage - 1)
                  }
                  disabled={currentPage === 1}
                  className={`px-3 py-2 rounded-md ${
                    currentPage === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 rounded-md ${
                      currentPage === index + 1
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    currentPage < totalPages &&
                    handlePageChange(currentPage + 1)
                  }
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 rounded-md ${
                    currentPage === totalPages
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WisataPage;
