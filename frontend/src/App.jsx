import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import WorkPage from './pages/WorkPage';
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <Router>
      <div className="bg-[#050505] min-h-screen selection:bg-blue-500 selection:text-white">
        <Navbar />

        <Routes>
          {/* Main Landing Page */}
          <Route path="/" element={<HomePage />} />

          {/* Dedicated Work/Projects Page */}
          <Route path="/work" element={<WorkPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;