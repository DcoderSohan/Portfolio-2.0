import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import Navigate

const WorkPerspective = () => {
  const navigate = useNavigate(); // Initialize hook

  const projects = [
    { title: "Quantum AI", cat: "Neural Engine", year: "2025" },
    { title: "Ether Flow", cat: "Liquid UX", year: "2024" },
    { title: "Neon Vault", cat: "Cryptography", year: "2024" },
  ];

  return (
    <section id="work" className="relative py-32 bg-[#050505] min-h-screen flex items-center overflow-hidden">
      
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
            <span className="w-8 h-[1px] bg-blue-600" /> Selected Cases
          </motion.h2>
        </div>

        {/* 2. THE 3D INTERACTION LIST */}
        <div className="flex flex-col gap-2">
          {projects.map((proj, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate('/work')} // REDIRECTION ON ROW CLICK
              className="group relative perspective-1000 cursor-pointer"
            >
              <div className="relative py-10 border-b border-white/5 flex flex-col md:flex-row justify-between items-center transition-all duration-700 ease-out group-hover:pl-8 group-hover:bg-white/[0.02]">
                
                {/* PROJECT NAME */}
                <div className="relative z-20 overflow-hidden">
                  <h3 className="text-5xl md:text-[6vw] font-black text-white/30 group-hover:text-white transition-all duration-500 uppercase tracking-tighter group-hover:tracking-normal group-hover:skew-x-[-12deg]">
                    {proj.title}
                  </h3>
                </div>

                {/* PROJECT DATA */}
                <div className="relative z-20 text-right mt-4 md:mt-0 opacity-40 group-hover:opacity-100 transition-all">
                  <p className="text-blue-500 font-mono text-[10px] uppercase tracking-widest">{proj.cat}</p>
                  <p className="text-white/20 group-hover:text-white/60 text-xs font-bold font-mono italic">[{proj.year}]</p>
                </div>

                {/* 3. THE REVEAL IMAGE */}
                <div className="absolute left-[40%] top-1/2 -translate-y-1/2 w-0 group-hover:w-[350px] h-[80%] opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[0.23, 1, 0.32, 1] z-10 overflow-hidden pointer-events-none">
                  <div className="w-full h-full bg-neutral-900 border border-white/10 relative skew-x-[12deg]">
                    <div className="absolute inset-0 bg-blue-600/20 mix-blend-overlay z-10" />
                    <div className="w-full h-full bg-gradient-to-tr from-blue-900 to-black animate-pulse" />
                    <div className="absolute inset-0 -skew-x-[12deg] scale-125">
                       <img src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover grayscale brightness-50" alt="work" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 4. REDIRECT BUTTON */}
        <motion.div 
          onClick={() => navigate('/work')} // REDIRECTION ON BUTTON CLICK
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

      <style jsx>{`
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </section>
  );
};

export default WorkPerspective;