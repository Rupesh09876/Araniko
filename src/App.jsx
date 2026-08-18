import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopBar from "./components/layout/TopBar";
import Navbar from "./components/layout/Navbar";
import MobileBar from "./components/layout/MobileBar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import AllDoctors from "./pages/AllDoctors";
import DoctorDetails from "./pages/DoctorDetails";

export default function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<AllDoctors />} />
          <Route path="/doctors/:id" element={<DoctorDetails />} />
        </Routes>
      </main>
      <Footer />
      <MobileBar />
    </BrowserRouter>
  );
}
