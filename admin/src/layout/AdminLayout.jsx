import { useLocation, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import MobileNav from '../components/MobileNav';

const AdminLayout = ({ setToken }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      <Sidebar setToken={setToken} />

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