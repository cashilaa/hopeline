import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import OurWork from './pages/OurWork';
import Contact from './pages/Contact';
import LostChildren from "./pages/lost-children"
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/admin" || location.pathname === "/admin/login";

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {!hideNavbar && <Navbar />}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/our-work" element={<OurWork />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/lost-children" element={<LostChildren />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
