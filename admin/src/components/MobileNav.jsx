import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Briefcase, MessageSquare, Plus, X, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const MobileNav = ({ setToken }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: 'Overview', path: '/', icon: <LayoutDashboard size={20} /> },
    { label: 'Projects', path: '/projects', icon: <Briefcase size={20} /> },
    { label: 'Messages', path: '/messages', icon: <MessageSquare size={20} /> },
  ];

  const handleNav = (path) => {
    setIsOpen(false);
    setTimeout(() => navigate(path), 300);
  };

  const handleLogout = () => {
    setIsOpen(false);
    setTimeout(() => setToken(''), 300);
  };

  return (
    // Outer wrapper: no padding here to allow the overlay to be true fullscreen
    <div className="fixed inset-0 pointer-events-none z-[100] lg:hidden">

      {/* FULLSCREEN OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
          />
        )}
      </AnimatePresence>

      {/* NAVIGATION CONTAINER */}
      <div className="fixed bottom-8 left-6 right-6 flex flex-col items-center gap-4 pointer-events-none">

        {/* EXPANDED MENU: Width fixed via left/right of parent */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-[400px] bg-[#0f0f0f] border border-white/10 rounded-[2.5rem] p-2 shadow-2xl pointer-events-auto overflow-hidden mb-4"
            >
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNav(item.path)}
                    className={`w-full flex items-center justify-between p-4 rounded-[2rem] transition-all mb-1 last:mb-0 ${isActive ? 'bg-blue-600 text-white' : 'text-neutral-400 hover:bg-white/5'
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={isActive ? 'text-white' : 'text-blue-500'}>
                        {item.icon}
                      </div>
                      <span className="font-bold text-sm tracking-tight">{item.label}</span>
                    </div>
                    {isActive && <div className="w.1.5 h-1.5 bg-white rounded-full animate-pulse" />}
                  </button>
                );
              })}

              {/* LOGOUT BUTTON */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-4 p-4 rounded-[2rem] text-red-500 hover:bg-red-500/10 transition-all mt-1"
              >
                <LogOut size={20} />
                <span className="font-bold text-sm tracking-tight">LOGOUT</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* TRIGGER DOCK */}
        <motion.div
          className="pointer-events-auto bg-[#0f0f0f] border border-white/10 rounded-full p-2 flex items-center gap-3 shadow-2xl"
        >
          <div className="pl-4 pr-2 py-2 text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em] border-r border-white/5">
            {location.pathname.split('/').pop() || 'Admin'}
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-white text-black rotate-0' : 'bg-blue-600 text-white'
              }`}
          >
            {isOpen ? <X size={20} /> : <Plus size={20} />}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default MobileNav;