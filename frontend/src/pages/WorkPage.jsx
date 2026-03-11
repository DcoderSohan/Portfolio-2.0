import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../config';

const WorkPage = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(`${backendUrl}/api/project/list`);
      const data = await response.json();
      if (data.success) {
        setProjects(data.projects);
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
    window.scrollTo(0, 0);
    fetchProjects();
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-32 pb-20 px-6 lg:pl-40">

      {/* 1. PAGE HEADER */}
      <header className="max-w-7xl mx-auto mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <span className="bg-gradient-to-r from-blue-600 via-indigo-700 to-slate-900 bg-clip-text text-transparent font-mono text-xs uppercase tracking-[0.8em]">Archive // 2024-2026</span>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8]">
            SELECTED <br /> <span className="text-transparent stroke-white italic">WORKS.</span>
          </h1>
        </motion.div>
      </header>

      {/* 2. PROJECT LIST */}
      <section className="max-w-7xl mx-auto flex flex-col gap-16 lg:gap-24">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4 opacity-30">
            <div className="w-12 h-12 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="font-mono text-[9px] uppercase tracking-[0.4em]">Loading_Projects...</p>
          </div>
        ) : error ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4">
            <p className="text-white/40 font-mono text-sm">Failed to load projects</p>
            <button
              onClick={fetchProjects}
              className="px-6 py-2 border border-white/20 text-white/60 hover:text-white hover:border-blue-600 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-300"
            >
              Retry
            </button>
          </div>
        ) : (
        projects.map((project, index) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="group relative"
          >
            {/* INDEX NUMBER — top label, always visible */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[clamp(3rem,8vw,7rem)] font-black leading-none text-white/[0.12] group-hover:text-blue-600/25 transition-colors select-none tabular-nums">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
            </div>

            {/* CARD BODY */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start bg-white/[0.025] border border-white/[0.06] rounded-2xl p-6 lg:p-10 group-hover:border-blue-600/20 group-hover:bg-white/[0.04] transition-all duration-500">

              {/* PROJECT IMAGE BOX */}
              <div className="lg:col-span-7 relative overflow-hidden bg-neutral-900 aspect-video rounded-xl border border-white/5 shadow-2xl">
                <motion.img
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 1.2 }}
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent opacity-60" />
              </div>

              {/* PROJECT DETAILS */}
              <div className="lg:col-span-5 flex flex-col gap-6 relative z-10 justify-center h-full">
                <div className="space-y-3">
                  <p className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent font-mono text-[10px] uppercase tracking-widest">{project.tags.join(' // ')}</p>
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.9]">{project.title}</h3>
                </div>

                <p className="text-neutral-400 text-sm lg:text-base font-light leading-relaxed">
                  {project.description}
                </p>

                {/* TECH STACK CHIPS */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tech => (
                    <span key={tech} className="px-3 py-1 bg-white/[0.04] border border-white/10 rounded-full text-[10px] font-mono uppercase tracking-wider text-neutral-400 hover:border-blue-600/40 hover:text-blue-400 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* ACTIONS */}
                <div className="flex gap-6 pt-2">
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-[11px] font-black uppercase tracking-widest rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 group/link">
                    View Live <ExternalLink size={14} className="group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))
        )}
      </section>

      {/* 3. MODERN CTA FOOTER */}
      <footer className="mt-32 pb-10 border-t border-white/5 pt-20 relative overflow-hidden">

        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="bg-gradient-to-r from-blue-600 via-indigo-700 to-slate-900 bg-clip-text text-transparent font-mono text-xs uppercase tracking-[0.5em] mb-12"
          >
            Ready for the next challenge
          </motion.p>

          <h2 className="text-6xl md:text-[10vw] font-black tracking-tighter leading-none uppercase mb-20">
            HAVE A PROJECT <br />
            <span className="text-transparent stroke-white italic">IN MIND?</span>
          </h2>

          <motion.button
            whileHover="hover"
            initial="initial"
            onClick={() => navigate('/contact')}
            className="relative group flex items-center justify-center p-20 cursor-pointer"
          >
            {/* The Outer Animated Ring */}
            <motion.div
              variants={{
                hover: { rotate: 180, scale: 1.1 }
              }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="absolute inset-0 border border-dashed border-neutral-700 rounded-full group-hover:border-blue-500/50"
            />

            {/* The Main Button Body */}
            <motion.div
              variants={{
                hover: { scale: 0.9 }
              }}
              className="relative w-44 h-44 bg-white text-black rounded-full flex flex-col items-center justify-center transition-colors duration-500 group-hover:bg-blue-600 group-hover:text-white"
            >
              <span className="text-[10px] font-black tracking-[0.3em] uppercase mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Start
              </span>
              <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform duration-500" />

              {/* Spinning Circular Text (Visible on Hover) */}
              <div className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full scale-110">
                  <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                  <text className="text-[7.5px] fill-white font-black uppercase tracking-[0.2em]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    <textPath href="#circlePath">
                      • LET'S BUILD SOMETHING • LET'S BUILD SOMETHING
                    </textPath>
                  </text>
                </svg>
              </div>
            </motion.div>
          </motion.button>
        </div>
      </footer>

      <style>{`
        .stroke-white {
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
};

export default WorkPage;
