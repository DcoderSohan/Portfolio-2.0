import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import './App.css';

function App() {
  const [activePage, setActivePage] = useState('home');

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      case 'projects':
        return <Projects />;
      case 'contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/5 via-black to-black"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-20 left-20 w-96 h-96 bg-green-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-500 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex relative z-10">
        {/* Sidebar - Hidden on mobile, visible on large screens */}
        <div className="hidden lg:block">
          <Sidebar activePage={activePage} setActivePage={setActivePage} onItemClick={null} />
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <button
            onClick={() => {
              const sidebar = document.getElementById('mobile-sidebar');
              const overlay = document.getElementById('mobile-overlay');
              sidebar?.classList.toggle('translate-x-0');
              overlay?.classList.toggle('hidden');
            }}
            className="border border-green-500/50 bg-black/80 p-2 text-green-400 hover:bg-green-500/20 transition-all"
          >
            <span className="font-mono text-xl">☰</span>
          </button>
        </div>

        {/* Mobile Overlay */}
        <div
          id="mobile-overlay"
          className="lg:hidden fixed inset-0 bg-black/50 z-30 hidden"
          onClick={() => {
            const sidebar = document.getElementById('mobile-sidebar');
            const overlay = document.getElementById('mobile-overlay');
            sidebar?.classList.add('-translate-x-full');
            overlay?.classList.add('hidden');
          }}
        ></div>

        {/* Mobile Sidebar */}
        <div
          id="mobile-sidebar"
          className="lg:hidden fixed inset-y-0 left-0 w-64 bg-black border-r border-green-500/30 transform -translate-x-full transition-transform duration-300 z-40"
        >
          <Sidebar 
            activePage={activePage} 
            setActivePage={setActivePage}
            onItemClick={() => {
              const sidebar = document.getElementById('mobile-sidebar');
              const overlay = document.getElementById('mobile-overlay');
              sidebar?.classList.add('-translate-x-full');
              overlay?.classList.add('hidden');
            }}
          />
        </div>

        {/* Main Content Area - Scrollable */}
        <main className="flex-1 lg:ml-64 overflow-y-auto h-screen">
          <div className="relative">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
