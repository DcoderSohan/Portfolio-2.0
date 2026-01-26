import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Briefcase, User, Mail } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const DarkNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState('home');

  const navItems = [
    { name: 'Home', icon: <Home size={20} />, id: 'home', path: '/' },
    { name: 'About', icon: <User size={20} />, id: 'about', path: '/about' },
    { name: 'Work', icon: <Briefcase size={20} />, id: 'work', path: '/work' },
    { name: 'Contact', icon: <Mail size={20} />, id: 'contact', path: '/contact' },
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = navItems.find(item => item.path === currentPath);
    if (activeItem) setActive(activeItem.id);
  }, [location.pathname]);

  const handleClick = (item) => {
    if (item.path !== location.pathname) {
      navigate(item.path);
    }
  };

  return (
    <>
      {/* DESKTOP SIDE DOCK */}
      <nav className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 flex-col gap-4 z-[10000]">
        <motion.div className="flex flex-col gap-4 p-2 bg-neutral-900/60 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-2xl">
          {navItems.map((item) => (
            <div key={item.name} className="relative group">
              <button
                onClick={() => handleClick(item)}
                className={`p-4 rounded-2xl flex items-center justify-center transition-all duration-300 relative z-20 ${
                  active === item.id ? 'text-white' : 'text-neutral-500'
                }`}
              >
                {/* Modern Hover Effect: Scaling the icon */}
                <motion.span 
                  whileHover={{ scale: 1.2 }}
                  className="relative z-30"
                >
                  {item.icon}
                </motion.span>
                
                {/* ACTIVE PILL */}
                {active === item.id && (
                  <motion.div
                    layoutId="activeTabDesktop"
                    className="absolute inset-0 bg-blue-600 rounded-2xl z-10 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
              
              {/* TOOLTIP: Modern sliding effect */}
              <div className="absolute left-16 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-md opacity-0 group-hover:opacity-100 group-hover:translate-x-4 pointer-events-none transition-all duration-300 shadow-xl whitespace-nowrap">
                {item.name}
              </div>
            </div>
          ))}
        </motion.div>
      </nav>

      {/* MOBILE BAR */}
      <nav className="lg:hidden fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-[380px] z-[10000]">
        <div className="flex justify-between items-center bg-neutral-950/90 backdrop-blur-2xl border border-white/10 p-2 rounded-[2.5rem] shadow-2xl">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleClick(item)}
              className="relative p-4 flex flex-col items-center justify-center grow"
            >
              <div className={`relative z-20 transition-all duration-500 ${active === item.id ? 'text-white scale-110' : 'text-neutral-500'}`}>
                {item.icon}
              </div>
              {active === item.id && (
                <motion.div
                  layoutId="activeTabMobile"
                  className="absolute inset-0 bg-blue-600 rounded-[1.8rem] z-10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default DarkNavbar;