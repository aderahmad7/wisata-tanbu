import MapSidebar from "../features/maps/MapSidebar";
import Map from "../features/maps/Map";

function AppLayout() {
  return (
    <div className="relative">
        <div className="flex h-dvh w-full">
          {/* Sidebar */}
          <MapSidebar />
          {/* Konten Utama (Full Map) */}
          <Map />
        </div>
    </div>
  );
}

export default AppLayout;
