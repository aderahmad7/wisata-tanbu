import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Popup,
  LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import geojsonData from "../../data/geojsonData";
import PopupCard from "../../components/PopupCard";
import SearchField from "../../components/SearchField";
import DetailCard from "../../components/DetailCard";
import { maps } from "../../services/api";
import { useState, useEffect, useCallback, useMemo } from "react";
import PacmanLoader from "react-spinners/PacmanLoader"; // Pastikan komponen ini ada

function Map() {
  const [isDetail, setIsDetail] = useState(false);
  const [dataDetail, setDataDetail] = useState(null);
  const [wisata, setWisata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWisata = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await maps();
      setWisata(response.data.response || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWisata();
  }, [fetchWisata]);

  const markers = useMemo(
    () =>
      wisata.map((item) => (
        <Marker
          key={item.id}
          position={[parseFloat(item.latitude), parseFloat(item.longitude)]}
        >
          <Popup>
            <PopupCard
              image={import.meta.env.VITE_IMAGE_URL + item.photo_url}
              title={item.place_name}
              location={item.location}
              view={item.ctr}
              setIsDetail={setIsDetail}
              setDataDetail={setDataDetail}
              dataDetail={item}
            />
          </Popup>
        </Marker>
      )),
    [wisata]
  );

  return (
    <div className="relative flex-1 z-10">
      <SearchField />
      <DetailCard isDetail={isDetail} setIsDetail={setIsDetail} data={dataDetail} />

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <PacmanLoader color="#36D7B7" />
        </div>
      ) : (
        <MapContainer
          center={[-3.37611, 115.772301]}
          zoom={10}
          className="h-full w-full"
          zoomControl={false}
        >
          <LayersControl position="topright">
            <LayersControl.BaseLayer name="Peta" checked>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Satelit">
              <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
            </LayersControl.BaseLayer>
          </LayersControl>

          {markers}

          <GeoJSON
            data={geojsonData}
            style={{ color: "#1D5477", fillColor: "blue", fillOpacity: 0.3 }}
          />
        </MapContainer>
      )}
    </div>
  );
}

export default Map;
