import React, { useState, useEffect } from "react";
import { countWisata, topWisata } from "../services/api";

const DashboardPage = () => {
  
  const [topVisit, setTopVisit] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jumlahWisata, setJumlahWisata] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const hitungWisata = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) throw new Error("Token tidak ditemukan di sessionStorage.");
        const response = await countWisata(token);
        setJumlahWisata(response.data.count);
      } catch (error) {
        setError(error.message);
      }
    };
    const fetchTopVisit = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = sessionStorage.getItem("token");
        if (!token) throw new Error("Token tidak ditemukan di sessionStorage.");
        const response = await topWisata(token);
        setTopVisit(response.data.data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopVisit();
    hitungWisata();
  }, []);

  return (
    <div className="p-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Attractions Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-800 mb-1">
            Jumlah Tempat Wisata
          </h3>
          <p className="text-3xl font-bold text-blue-600">
            {error ? error : jumlahWisata}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Jumlah total lokasi wisata yang terdaftar
          </p>
        </div>

        {/* Original cards */}
        {[1, 2].map((item) => (
          <div
            key={item}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
          >
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Card {item}
            </h3>
            <p className="text-gray-600">
              Ini adalah contoh konten untuk card dashboard.
            </p>
          </div>
        ))}
      </div>

      {/* Most Visited Places Table */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          5 Tempat Paling Sering Dikunjungi
        </h3>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center py-12 text-gray-500">
              Memuat data...
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">
              Gagal memuat data: {error}
            </div>
          ) : topVisit.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              Tidak ada tempat wisata yang ditemukan.
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    No
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Nama Tempat
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Kecamatan
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Jumlah Pengunjung
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topVisit.map((place, index) => (
                  <tr key={place.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {place.place_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {place.subdistrict}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {place.ctr.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
