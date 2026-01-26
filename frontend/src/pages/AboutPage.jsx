import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Terminal, Cpu, Globe, Zap } from 'lucide-react';

const AboutPage = () => {
  // Ensure we start at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const skills = [
    { name: "Frontend", tools: "React / Next.js / Three.js", icon: <Globe size={20} /> },
    { name: "Backend", tools: "Node / Go / PostgreSQL", icon: <Terminal size={20} /> },
    { name: "Infrastructure", tools: "Docker / AWS / Vercel", icon: <Cpu size={20} /> },
  ];

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-32 pb-20 px-6 lg:pl-40 overflow-hidden">
      
      {/* 1. TYPOGRAPHIC HERO */}
      <section className="max-w-7xl mx-auto mb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <span className="text-blue-500 font-mono text-xs uppercase tracking-[0.6em] block mb-6">
            Introduction // 01
          </span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase mb-12">
            Architecting <br /> 
            <span className="text-transparent stroke-white">Digital Systems.</span>
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <p className="text-neutral-400 text-xl md:text-2xl font-light leading-relaxed">
              I'm a Full-Stack Engineer specializing in high-performance web applications. 
              I bridge the gap between <span className="text-white italic">complex backend logic</span> and 
              <span className="text-white italic"> fluid user interfaces</span>.
            </p>
            <div className="flex gap-4">
               <div className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center animate-bounce">
                  <Zap size={20} className="text-blue-500 fill-blue-500" />
               </div>
               <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest leading-loose">
                 Currently building <br /> scalable MERN ecosystems.
               </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. BENTO GRID SKILLS */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 bg-neutral-900/40 border border-white/5 rounded-3xl hover:bg-neutral-800/50 transition-all group"
          >
            <div className="mb-6 text-blue-500 group-hover:scale-110 transition-transform duration-500">
              {skill.icon}
            </div>
            <h3 className="text-2xl font-bold mb-2 uppercase tracking-tight">{skill.name}</h3>
            <p className="text-neutral-500 font-mono text-xs uppercase tracking-wider leading-relaxed">
              {skill.tools}
            </p>
          </motion.div>
        ))}

        {/* LARGE BENTO BOX: EXPERIENCE */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="md:col-span-2 p-10 bg-neutral-900/40 border border-white/5 rounded-3xl flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-8">
            <h3 className="text-3xl font-black uppercase tracking-tighter">Experience</h3>
            <Code2 className="text-neutral-700" />
          </div>
          <div className="space-y-6">
            <div className="flex justify-between border-b border-white/5 pb-4">
              <div>
                <p className="text-white font-bold uppercase">Senior Developer</p>
                <p className="text-neutral-500 text-sm">TechFlow Systems</p>
              </div>
              <p className="text-neutral-600 font-mono text-xs">2024 — PRESENT</p>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="text-white font-bold uppercase">MERN Specialist</p>
                <p className="text-neutral-500 text-sm">Freelance // Global</p>
              </div>
              <p className="text-neutral-600 font-mono text-xs">2022 — 2024</p>
            </div>
          </div>
        </motion.div>

        {/* SMALL BENTO BOX: QUOTE */}
        <div className="p-8 bg-blue-600 rounded-3xl flex items-center justify-center text-center italic font-serif text-2xl">
          "Simplicity is the soul of efficiency."
        </div>
      </section>

      {/* 3. CTA MINI SECTION */}
      <section className="max-w-7xl mx-auto py-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <h2 className="text-3xl font-bold uppercase tracking-tighter">Want to see the tech behind this?</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-white text-black font-black uppercase text-xs tracking-[0.2em] rounded-full"
        >
          Download CV
        </motion.button>
      </section>

      <style jsx>{`
        .stroke-white {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
};

export default AboutPage;