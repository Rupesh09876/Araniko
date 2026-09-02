import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./components/layout/PublicLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import AdminLayout from "./components/layout/AdminLayout";

// Public Pages
import Home from "./pages/Home";
import AllDoctors from "./pages/AllDoctors";
import DoctorDetails from "./pages/DoctorDetails";
import AllNews from "./pages/AllNews";
import NewsDetails from "./pages/NewsDetails";
import Login from "./pages/Login";

// Admin Pages
import DashboardHome from "./pages/admin/DashboardHome";
import DoctorsManagement from "./pages/admin/DoctorsManagement";
import NewsManagement from "./pages/admin/NewsManagement";
import ProfileManagement from "./pages/admin/ProfileManagement";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Site — with navbar, footer, etc. */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<AllDoctors />} />
          <Route path="/doctors/:id" element={<DoctorDetails />} />
          <Route path="/news" element={<AllNews />} />
          <Route path="/news/:id" element={<NewsDetails />} />
        </Route>

        {/* Admin Login — no navbar/footer */}
        <Route path="/login" element={<Login />} />

        {/* Admin Panel — protected, with sidebar layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<DashboardHome />} />
            <Route path="/admin/doctors" element={<DoctorsManagement />} />
            <Route path="/admin/news" element={<NewsManagement />} />
            <Route path="/admin/profile" element={<ProfileManagement />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
