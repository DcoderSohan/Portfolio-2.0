import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../config';

const WorkPerspective = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    setError(false);
    try {
      // Wake up the server first (Render cold start)
      fetch(`${backendUrl}/api/health`).catch(() => {});
      const response = await fetch(`${backendUrl}/api/project/list`);
      const data = await response.json();
      if (data.success) {
        const sorted = data.projects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3);
        setProjects(sorted);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section id="work" className="relative py-20 bg-[#050505] min-h-screen flex items-center overflow-hidden">

      {/* 1. BACKGROUND ACCENT */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:block">
        <p className="text-[15vw] font-black text-white/[0.02] rotate-90 select-none">
          2026
        </p>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 lg:pl-32 relative z-10">
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-white text-xs font-mono tracking-[0.8em] uppercase mb-4 flex items-center gap-4"
          >
            <span className="w-8 h-[1px] bg-gradient-to-r from-blue-600 to-indigo-900" /> Selected Cases
          </motion.h2>
        </div>

        {/* 2. THE 3D INTERACTION LIST */}
        <div className="flex flex-col gap-2">

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="py-6 border-b border-white/5 animate-pulse">
                  <div className="h-8 md:h-12 bg-white/5 rounded w-3/4 mb-3" />
                  <div className="h-3 bg-white/5 rounded w-1/3" />
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="py-12 text-center">
              <p className="text-white/40 font-mono text-sm mb-4">Failed to load projects</p>
              <button
                onClick={fetchProjects}
                className="px-6 py-2 border border-white/20 text-white/60 hover:text-white hover:border-blue-600 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-300"
              >
                Retry
              </button>
            </div>
          )}

          {/* Projects List */}
          {!loading && !error && projects.map((proj, i) => (
            <motion.div
              key={proj._id || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => window.open(proj.liveLink, '_blank')}
              className="group relative perspective-1000 cursor-pointer"
            >
              <div className="relative py-6 border-b border-white/5 flex flex-col md:flex-row justify-between transition-[padding,background-color] duration-700 ease-out group-hover:pl-8 group-hover:bg-white/[0.02]">

                {/* PROJECT NAME */}
                <div className="relative z-20 overflow-hidden">
                  <h3 className="text-2xl md:text-[4vw] font-black text-white/30 group-hover:text-white transition-all duration-500 uppercase tracking-tighter md:group-hover:skew-x-[-12deg] truncate">
                    {proj.title}
                  </h3>
                </div>

                {/* PROJECT DATA */}
                <div className="relative z-20 text-right mt-4 md:mt-0 opacity-40 group-hover:opacity-100 transition-all flex-shrink-0">
                  <p className="bg-gradient-to-r from-blue-600 via-indigo-700 to-slate-900 bg-clip-text text-transparent font-mono text-[10px] uppercase tracking-widest">{proj.tags.join(', ')}</p>
                  <p className="text-white/20 group-hover:text-white/60 text-xs font-bold font-mono italic">[ARCHIVE]</p>
                </div>

                {/* 3. THE REVEAL IMAGE — hidden on mobile */}
                <div className="absolute left-[40%] top-1/2 -translate-y-1/2 w-0 group-hover:w-[350px] h-[80%] opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[0.23, 1, 0.32, 1] z-10 overflow-hidden pointer-events-none hidden md:block">
                  <div className="w-full h-full bg-neutral-900 border border-white/10 relative skew-x-[12deg]">
                    <div className="absolute inset-0 bg-blue-600/20 mix-blend-overlay z-10" />
                    <div className="w-full h-full bg-gradient-to-tr from-blue-900 to-black animate-pulse" />
                    <div className="absolute inset-0 -skew-x-[12deg] scale-125">
                      <img src={proj.image} className="w-full h-full object-cover grayscale brightness-50" alt={proj.title} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 4. REDIRECT BUTTON */}
        <motion.div
          onClick={() => navigate('/work')}
          whileHover={{ x: 10 }}
          className="mt-20 inline-flex items-center gap-4 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-500">
            <span className="text-white text-lg">→</span>
          </div>
          <span className="text-white/40 group-hover:text-white font-mono text-[10px] uppercase tracking-[0.4em] transition-colors">
            View All Archives
          </span>
        </motion.div>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </section>
  );
};

export default WorkPerspective;
