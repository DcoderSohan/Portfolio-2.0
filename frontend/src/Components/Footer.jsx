import React from 'react';
import { motion } from 'framer-motion';

const DeepSpaceFooter = () => {
  return (
    <footer className="relative bg-[#050505] flex flex-col justify-end px-6 lg:pl-40 pt-24 pb-12 overflow-hidden" id='contact'>

      {/* 1. THE DISTANT WATERMARK (Parallax Effect) */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 0.05 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <h2 className="text-[30vw] font-black tracking-tighter text-white uppercase italic leading-none">
          END.
        </h2>
      </motion.div>

      {/* 2. THE FLOATING CONTACT HUB */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center mb-32 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="space-y-4"
        >
          <span className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-900 bg-clip-text text-transparent font-mono text-[10px] uppercase tracking-[0.6em] md:tracking-[1em]">
            Available Globally
          </span>

          <a
            href="mailto:sohansarang05@gmail.com"
            className="group relative inline-block py-4"
          >
            {/* - text-[6.5vw] scales the font to the phone width 
          - hover:tracking-normal keeps it from expanding too far 
      */}
            <h2 className="text-[6.5vw] md:text-6xl lg:text-6xl font-[300] text-white transition-all duration-500 tracking-tighter group-hover:tracking-normal"
              style={{ fontFamily: "'Poppins', sans-serif" }}>
              sohansarang05<span className="bg-gradient-to-r from-blue-600 to-indigo-900 bg-clip-text text-transparent font-[900]">@</span>gmail.com
            </h2>

            {/* The Liquid Underline */}
            <motion.div
              className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-700"
            />
          </a>
        </motion.div>
      </div>

      {/* 3. THE UTILITY DOCK (Footer Navigation) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto border-t border-white/5 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">

          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-white font-black text-xl tracking-tighter uppercase">Sohan Sarang</h3>
            <p className="text-neutral-500 text-sm font-light max-w-xs leading-relaxed">
              Crafting high-performance digital architectures with the MERN stack. Focused on the future of web interaction.
            </p>
          </div>

          {/* Social Links with Custom Hover */}
          <div className="md:col-span-4 flex gap-6 md:justify-center">
            {[
              { name: 'LinkedIn', url: 'https://linkedin.com/in/sohan-sarang' },
              { name: 'Github', url: 'https://github.com/DcoderSohan' }
            ].map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest hover:text-white transition-all border-b border-transparent hover:border-blue-600 pb-1"
              >
                {social.name}
              </a>
            ))}
          </div>

          {/* Copyright & Technical Meta */}
          <div className="md:col-span-4 md:text-right space-y-2">
            <p className="text-neutral-600 font-mono text-[10px] uppercase tracking-widest">
              © 2026 // All rights reserved by Sohan Sarang
            </p>
            <p className="text-white/40 font-mono text-[9px] uppercase tracking-widest">
              Ratnagiri, Maharashtra, India
            </p>
          </div>
        </div>
      </div>

      {/* 4. MASKING FADE TO BOTTOM */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-blue-600/10 to-transparent pointer-events-none" />

    </footer>
  );
};

export default DeepSpaceFooter;