import React,{useEffect} from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

const WorkPage = () => {
  const projects = [
    {
      id: "01",
      title: "Vortex AI",
      category: "SaaS // Machine Learning",
      description: "A full-stack dashboard for monitoring neural network latency in real-time.",
      stack: ["React", "Node.js", "MongoDB", "Tailwind"],
      color: "from-blue-600/20",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600"
    },
    {
      id: "02",
      title: "Nebula Pay",
      category: "Fintech // Blockchain",
      description: "Decentralized payment gateway with multi-signature wallet support.",
      stack: ["Next.js", "Express", "PostgreSQL", "Solidity"],
      color: "from-indigo-600/20",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1600"
    }
  ];


  useEffect(() => {
    window.scrollTo(0, 0);
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
          <span className="text-blue-500 font-mono text-xs uppercase tracking-[0.8em]">Archive // 2024-2026</span>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8]">
            SELECTED <br /> <span className="text-transparent stroke-white">WORKS.</span>
          </h1>
        </motion.div>
      </header>

      {/* 2. PROJECT LIST */}
      <section className="max-w-7xl mx-auto space-y-64">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            {/* LARGE INDEX NUMBER */}
            <span className="absolute -top-20 -left-10 text-[15vw] font-black text-white/5 select-none pointer-events-none group-hover:text-blue-600/10 transition-colors">
              {project.id}
            </span>

            {/* PROJECT IMAGE BOX */}
            <div className="lg:col-span-7 relative overflow-hidden bg-neutral-900 aspect-video rounded-sm border border-white/5 shadow-2xl">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.5 }}
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
              />
              <div className={`absolute inset-0 bg-gradient-to-tr ${project.color} to-transparent opacity-60`} />
            </div>

            {/* PROJECT DETAILS */}
            <div className="lg:col-span-5 space-y-8 relative z-10">
              <div className="space-y-2">
                <p className="text-blue-500 font-mono text-xs uppercase tracking-widest">{project.category}</p>
                <h3 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-none">{project.title}</h3>
              </div>

              <p className="text-neutral-400 text-lg font-light leading-relaxed max-w-md">
                {project.description}
              </p>

              {/* TECH STACK CHIPS */}
              <div className="flex flex-wrap gap-3">
                {project.stack.map(tech => (
                  <span key={tech} className="px-3 py-1 border border-white/10 rounded-full text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                    {tech}
                  </span>
                ))}
              </div>

              {/* ACTIONS */}
              <div className="flex gap-6 pt-4">
                <a href="#" className="flex items-center gap-2 text-white font-bold hover:text-blue-500 transition-colors group/link">
                  View Project <ExternalLink size={18} className="group-hover/link:-translate-y-1 transition-transform" />
                </a>
                <a href="#" className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors">
                  Source <Github size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* 3. MODERN CTA FOOTER */}
      <footer className="mt-64 pb-10 border-t border-white/5 pt-20 relative overflow-hidden">

        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-blue-500 font-mono text-xs uppercase tracking-[0.5em] mb-12"
          >
            Ready for the next challenge
          </motion.p>

          <h2 className="text-6xl md:text-[10vw] font-black tracking-tighter leading-none uppercase mb-20">
            HAVE A SYSTEM <br />
            <span className="text-transparent stroke-white italic">IN MIND?</span>
          </h2>

          {/* THE MODERN MAGNETIC BUTTON */}
          <motion.button
            whileHover="hover"
            initial="initial"
            className="relative group flex items-center justify-center p-20"
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
              <span className="text-[10px] font-black tracking-[0.3em] uppercase mb-1">Start</span>
              <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform duration-500" />

              {/* Spinning Circular Text (Visible on Hover) */}
              <div className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <svg viewBox="0 0 100 100" className="w-full h-full scale-110">
                  <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                  <text className="text-[7.5px] fill-white font-black uppercase tracking-[0.2em]">
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

      <style jsx>{`
        .stroke-white {
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
};

export default WorkPage;