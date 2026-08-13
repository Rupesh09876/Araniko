import TopBar from "./components/layout/TopBar";
import Navbar from "./components/layout/Navbar";
import MobileBar from "./components/layout/MobileBar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";

export default function App() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        <Home />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
