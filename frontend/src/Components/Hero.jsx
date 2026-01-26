import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SymmetricHero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax for the "Faded" Image
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const strokeX = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#050505] flex items-center justify-center overflow-hidden"
    >
      {/* 1. LEFT SIDE: MINIMALISM */}
      <div className="absolute left-0 w-1/2 h-full hidden lg:block border-r border-white/5">
        <div className="absolute bottom-12 left-12">
          <p className="text-white/20 font-mono text-[10px] uppercase tracking-[0.5em] [writing-mode:vertical-lr] rotate-180">
            Available for Projects // 2026
          </p>
        </div>
      </div>

      {/* 2. RIGHT SIDE: THE FADED PORTRAIT */}
      <div className="absolute -right-24 md:right-0 w-full lg:w-1/2 h-full overflow-hidden">
        <motion.div 
          style={{ y: imageY }}
          className="relative w-full h-full"
        >
          {/* Faded Effect Layer (Gradient Mask) */}
          <div className="absolute inset-0 z-10 
            bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent 
            lg:bg-gradient-to-r lg:from-[#050505] lg:to-transparent" 
          />
          
          <img 
            src="/Me2.jpg" 
            alt="Sohan Sarang"
            className="w-full h-full object-cover grayscale opacity-40 contrast-125 mix-blend-luminosity"
          />
        </motion.div>
      </div>

      {/* 3. CENTERED CONTENT: LARGE STROKE UI */}
      <div className="relative z-20 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Massive Stroke Text Behind */}
          <motion.h2 
            style={{ x: strokeX }}
            className="absolute -top-16 lg:-top-24 text-[20vw] font-black text-transparent stroke-text opacity-20 whitespace-nowrap select-none"
          >
            MERN CORE
          </motion.h2>

          {/* Primary Centered Heading */}
          <h1 className="text-[15vw] lg:text-[10vw] font-black text-white leading-none tracking-tighter uppercase relative">
            WEB<br />
            <span className="text-blue-600">DEVELOPER</span>
          </h1>

          {/* Tagline */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="h-12 w-[1px] bg-gradient-to-b from-blue-600 to-transparent" />
            <p className="text-neutral-500 font-mono text-xs md:text-sm tracking-[0.4em] uppercase">
              OPEN TO <span className="text-white">WORK</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* 4. BOTTOM ACTION */}
      <div className="absolute bottom-12 flex flex-col items-center gap-4">
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 border border-white/20 rounded-full flex justify-center p-1"
        >
          <div className="w-1 h-2 bg-blue-600 rounded-full" />
        </motion.div>
        <span className="text-white/20 font-mono text-[8px] uppercase tracking-widest">Scroll</span>
      </div>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.5);
        }
        @media (max-width: 1024px) {
          .stroke-text { -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3); }
        }
      `}</style>
    </section>
  );
};

export default SymmetricHero;