import React from 'react';
import { motion } from 'framer-motion';

const SymmetricHero = () => {


  return (
    <section
      className="relative min-h-[100vh] w-full bg-[#050505] flex items-center justify-center overflow-hidden"
    >
      {/* 1. LEFT SIDE DECOR */}
      <div className="absolute left-0 w-1/2 h-full hidden lg:block border-r border-white/5">
        <div className="absolute bottom-12 left-12">
          <p className="text-white/20 font-mono text-[10px] uppercase tracking-[0.5em] [writing-mode:vertical-lr] rotate-180">
            Available for Projects // 2026
          </p>
        </div>
      </div>

      {/* 2. RIGHT SIDE: THE FADED PORTRAIT */}
      <div className="absolute inset-0 lg:left-1/2 lg:right-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ willChange: "transform, opacity" }}
          className="relative w-full h-full"
        >
          {/* Responsive Gradients */}
          <div className="absolute inset-0 z-10 
            bg-gradient-to-t from-[#050505] via-transparent to-[#050505]
            lg:bg-gradient-to-r lg:from-[#050505] lg:via-[#050505]/20 lg:to-transparent"
          />
          <img
            src="/Me2.jpg"
            alt="Sohan Sarang"
            loading="eager"
            className="w-full h-full object-cover object-center lg:object-[50%_20%] grayscale opacity-40 lg:opacity-60 contrast-125"
          />
        </motion.div>
      </div>

      {/* 3. CENTERED CONTENT */}
      <div className="relative z-20 text-center px-8 lg:px-4 pointer-events-none w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Poppins Stroke Text */}
          <motion.h2
            style={{ fontFamily: "'Poppins', sans-serif" }}
            className="absolute -top-10 lg:-top-24 left-1/2 -translate-x-1/2 text-[20vw] lg:text-[22vw] font-black text-transparent stroke-text opacity-10 whitespace-nowrap select-none italic"
          >
            MERN CORE
          </motion.h2>

          {/* Poppins Main Title */}
          <h1 className="text-[13vw] lg:text-[11vw] font-[900] text-white text-center leading-[0.8] tracking-[-0.05em] uppercase relative">
            <span className="text-white">WEB</span><br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-700 to-slate-900 bg-clip-text text-transparent stroke-white-low">DEVELOPER</span>
          </h1>

          <div className="mt-12 flex flex-col items-center gap-4">
            <div className="h-16 w-[1px] bg-gradient-to-b from-blue-600 to-transparent" />
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <p className="text-neutral-500 font-mono text-[10px] tracking-[0.4em] uppercase">
                <span className="text-white font-bold">Scroll</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 4. SCROLL INDICATOR - Anchored to Viewport Bottom */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border border-white/20 rounded-full flex justify-center p-1 backdrop-blur-sm"
        >
          <div className="w-1 h-2 bg-blue-500 rounded-full" />
        </motion.div>
        <span className="text-white/20 font-mono text-[8px] uppercase tracking-[0.3em]">
          Scroll
        </span>
      </div>

      <style>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);
        }
        @media (min-width: 1024px) {
          .stroke-text { -webkit-text-stroke: 2px rgba(255, 255, 255, 0.5); }
        }
        .stroke-blue-theme {
          -webkit-text-stroke: 1px #2563eb;
        }
        .stroke-white-low {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </section>
  );
};

export default SymmetricHero;