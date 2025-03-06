import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import WisataPage from "./pages/WisataPage";
import PrivateRoute from "./routes/PrivateRoutes";
import GlobalStyles from "./styles/Globalstyles";
import Home from "./pages/Home";
import AppLayout from "./pages/AppLayout";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/maps" element={<AppLayout />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<DashboardLayout />}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="wisata" element={<WisataPage />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
