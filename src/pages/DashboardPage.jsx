import { useState, useEffect } from "react";
import { countWisata, topWisata } from "../services/api";
import { MapPin, Users, TrendingUp, AlertCircle, Loader } from "lucide-react";

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

  // Placeholder data for the other cards
  const statsData = [
    {
      title: "Jumlah Pengunjung",
      value: "12,845",
      description: "Total pengunjung bulan ini",
      icon: <Users size={20} className="text-indigo-600" />,
      change: "+24%",
      trend: "up",
    },
    {
      title: "Rata-rata Kunjungan",
      value: "214",
      description: "Kunjungan per hari",
      icon: <TrendingUp size={20} className="text-emerald-600" />,
      change: "+12%",
      trend: "up",
    },
  ];

  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Dashboard Wisata
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Attractions Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Jumlah Tempat Wisata
                </p>
                <h3 className="text-3xl font-bold text-gray-800">
                  {error ? "-" : jumlahWisata.toLocaleString()}
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  Total lokasi wisata terdaftar
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <MapPin size={24} className="text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-1" />
        </div>

        {/* Additional stat cards */}
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    {stat.title}
                  </p>
                  <h3 className="text-3xl font-bold text-gray-800">
                    {stat.value}
                  </h3>
                  <div className="flex items-center mt-2">
                    <p className="text-sm text-gray-500 mr-2">
                      {stat.description}
                    </p>
                    <span
                      className={`text-xs font-medium ${
                        stat.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div
                  className={`p-3 rounded-lg ${
                    index === 0 ? "bg-indigo-50" : "bg-emerald-50"
                  }`}
                >
                  {stat.icon}
                </div>
              </div>
            </div>
            <div
              className={`h-1 ${
                index === 0
                  ? "bg-gradient-to-r from-indigo-500 to-indigo-600"
                  : "bg-gradient-to-r from-emerald-500 to-emerald-600"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Most Visited Places Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">
            5 Tempat Paling Sering Dikunjungi
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Berdasarkan jumlah kunjungan tercatat
          </p>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-16 text-gray-500">
              <Loader size={24} className="animate-spin mr-2" />
              <span>Memuat data...</span>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-16 text-red-500">
              <AlertCircle size={24} className="mr-2" />
              <span>Gagal memuat data: {error}</span>
            </div>
          ) : topVisit.length === 0 ? (
            <div className="flex items-center justify-center py-16 text-gray-500">
              <span>Tidak ada tempat wisata yang ditemukan.</span>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    No
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Nama Tempat
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Kecamatan
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Jumlah Pengunjung
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topVisit.map((place, index) => (
                  <tr
                    key={place.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium">
                        {index + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {place.place_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {place.subdistrict}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {place.ctr.toLocaleString()}
                        <span className="ml-2 text-xs bg-blue-100 text-blue-800 py-1 px-2 rounded-full">
                          pengunjung
                        </span>
                      </div>
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
