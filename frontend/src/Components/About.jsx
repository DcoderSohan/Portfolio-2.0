import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate

const SideAnchoredAbout = () => {
  const navigate = useNavigate(); // 2. Initialize the hook

  const slideFromLeft = {
    initial: { opacity: 0, x: -100 },
    whileInView: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="relative min-h-screen bg-[#050505] flex items-center py-16 px-6 lg:pl-32 lg:pr-24 overflow-hidden" id='about'>

      {/* 1. KINETIC BACKGROUND LINE */}
      <div className="absolute left-0 top-0 w-[1px] h-full bg-gradient-to-b from-blue-600 to-slate-950" />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-10 gap-16 relative z-10">

        {/* LEFT COLUMN */}
        <div className="lg:col-span-4 flex flex-col justify-center">
          <motion.div {...slideFromLeft}>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-gradient-to-r from-blue-600 to-indigo-900" />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-700 to-slate-900 bg-clip-text text-transparent font-mono text-[10px] uppercase tracking-[0.6em]">Profile</span>
            </div>

            <h2 className="text-white text-6xl lg:text-9xl font-black leading-[0.8] uppercase tracking-tighter">
              SOHAN<br />
              <span className="text-transparent stroke-white italic">SARANG</span>
            </h2>
          </motion.div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-20">

          {/* Main Statement */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative"
          >
            <h3 className="text-white text-3xl lg:text-5xl font-light leading-tight">
              A <span className="bg-gradient-to-r from-blue-600 via-indigo-700 to-slate-900 bg-clip-text text-transparent italic font-bold">MERN Architect</span> designing systems that transform raw data into seamless human experiences.
            </h3>
          </motion.div>

          {/* Detailed Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-white/5 pt-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <h4 className="text-[10px] font-mono bg-gradient-to-r from-blue-600 via-indigo-700 to-slate-900 bg-clip-text text-transparent uppercase tracking-widest">Technicals</h4>
              <p className="text-neutral-500 text-sm font-light leading-relaxed">
                Specializing in <span className="text-white">Node.js</span> high-concurrency architecture and <span className="text-white">React</span> micro-interactions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <h4 className="text-[10px] font-mono bg-gradient-to-r from-blue-600 via-indigo-700 to-slate-900 bg-clip-text text-transparent uppercase tracking-widest">Philosophy</h4>
              <p className="text-neutral-500 text-sm font-light leading-relaxed">
                Code should be as <span className="text-white italic">elegant</span> as it is functional. I build for scalability and performance.
              </p>
            </motion.div>
          </div>

          {/* 3. REDIRECTION BUTTON */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="pt-6"
          >
            <button
              onClick={() => navigate('/about')} // 3. Set the destination path here
              className="group flex items-center gap-6"
            >
              <span className="text-white font-mono text-[10px] uppercase tracking-[0.4em] group-hover:text-blue-500 transition-colors">
                Read Full Bio
              </span>
              <div className="w-12 h-[1px] bg-white/20 group-hover:w-24 group-hover:bg-blue-500 transition-all duration-500" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* BACKGROUND DECORATION */}
      <div className="absolute -bottom-20 -right-20 opacity-[0.03] select-none pointer-events-none">
        <h2 className="text-[25vw] font-black text-white uppercase tracking-tighter">
          BIO
        </h2>
      </div>

      <style>{`
        .stroke-white {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </section>
  );
};

export default SideAnchoredAbout;