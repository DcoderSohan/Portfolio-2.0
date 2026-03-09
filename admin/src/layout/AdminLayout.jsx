import { useLocation, Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import MobileNav from '../components/MobileNav';

const AdminLayout = ({ setToken }) => {
  const location = useLocation();
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (location.state?.successMessage) {
      setToast(location.state.successMessage);
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      <Sidebar setToken={setToken} />

      {/* Global Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[500] flex items-center gap-4 bg-neutral-900 border border-green-500/30 shadow-[0_0_40px_rgba(34,197,94,0.2)] px-6 py-4 rounded-2xl"
          >
            <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <p className="text-white font-bold text-sm">{toast}</p>
              <p className="text-neutral-500 font-mono text-[9px] uppercase tracking-widest">Sohan.DB // Operation success</p>
            </div>
            {/* Auto-dismiss progress */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 4, ease: "linear" }}
              style={{ transformOrigin: "right" }}
              className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 rounded-b-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 lg:ml-72 relative">
        <AnimatePresence mode="wait">
          {/* We use the pathname as a key so Framer knows when the route changes */}
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="max-w-7xl mx-auto p-6 md:p-12 pb-32"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <MobileNav setToken={setToken} />
    </div>
  );
};

export default AdminLayout;