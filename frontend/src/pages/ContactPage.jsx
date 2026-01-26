import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Linkedin, Twitter, ArrowUpRight, Globe } from 'lucide-react';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const socials = [
    { name: "LinkedIn", link: "#", icon: <Linkedin size={18} /> },
    { name: "GitHub", link: "#", icon: <Github size={18} /> },
    { name: "X / Twitter", link: "#", icon: <Twitter size={18} /> },
  ];

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-32 pb-20 px-6 lg:pl-40 overflow-hidden relative">
      
      {/* 1. BACKGROUND GLOWS */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-indigo-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 relative z-10">
        
        {/* LEFT SIDE: THE PITCH */}
        <div className="lg:col-span-5 space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-blue-500 font-mono text-xs uppercase tracking-[0.6em] block mb-6">
              Transmission // 03
            </span>
            <h1 className="text-7xl md:text-8xl font-black tracking-tighter leading-[0.8] uppercase mb-8">
              START A <br /> 
              <span className="text-transparent stroke-white">PROJECT.</span>
            </h1>
            <p className="text-neutral-400 text-lg font-light leading-relaxed max-w-md">
              Whether you have a fully baked idea or just a spark, let’s build something that redefines the standard.
            </p>
          </motion.div>

          {/* Social Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {socials.map((social, i) => (
              <motion.a
                key={social.name}
                href={social.link}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="group flex items-center justify-between p-4 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/[0.08] transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-neutral-500 group-hover:text-blue-500 transition-colors">{social.icon}</span>
                  <span className="text-xs font-mono uppercase tracking-widest">{social.name}</span>
                </div>
                <ArrowUpRight size={14} className="text-neutral-700 group-hover:text-white transition-all" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: THE INTERACTIVE FORM */}
        <motion.div 
          className="lg:col-span-7 bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-[2rem] backdrop-blur-3xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2 relative">
                <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500 ml-1">Identity</label>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-white/[0.03] border-b border-white/10 p-4 focus:border-blue-600 focus:outline-none transition-all placeholder:text-neutral-700 text-white rounded-t-lg"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500 ml-1">Direct Line</label>
                <input 
                  type="email" 
                  placeholder="email@example.com" 
                  className="w-full bg-white/[0.03] border-b border-white/10 p-4 focus:border-blue-600 focus:outline-none transition-all placeholder:text-neutral-700 text-white rounded-t-lg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500 ml-1">The Mission</label>
              <textarea 
                rows="5" 
                placeholder="Briefly describe your vision..." 
                className="w-full bg-white/[0.03] border-b border-white/10 p-4 focus:border-blue-600 focus:outline-none transition-all placeholder:text-neutral-700 text-white rounded-t-lg resize-none"
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 hover:bg-white hover:text-black py-6 rounded-2xl flex items-center justify-center gap-4 text-xs font-black uppercase tracking-[0.5em] transition-all duration-500 group shadow-[0_0_30px_rgba(37,99,235,0.2)]"
            >
              Initiate Contact
              <Send size={16} className="group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
            </motion.button>

            <p className="text-center text-[10px] font-mono text-neutral-600 tracking-widest uppercase">
              Average response time: &lt; 24 Hours
            </p>
          </form>
        </motion.div>
      </div>

      <style jsx>{`
        .stroke-white {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
};

export default ContactPage;