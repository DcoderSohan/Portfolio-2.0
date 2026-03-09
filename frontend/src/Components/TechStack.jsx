import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Globe, Database, Layers, Zap, Hexagon } from 'lucide-react';

const TechStack = ({ id }) => {
    const coreStack = [
        { name: "MongoDB", category: "Database_Layer", icon: <Database size={24} />, level: "85%", color: "text-green-500" },
        { name: "Express.js", category: "API_Protocol", icon: <Zap size={24} />, level: "90%", color: "text-neutral-300" },
        { name: "React / Vite", category: "Frontend_Engine", icon: <Layers size={24} />, level: "95%", color: "text-blue-500" },
        { name: "Node.js", category: "Runtime_Env", icon: <Cpu size={24} />, level: "88%", color: "text-green-400" },
        { name: "Cloudinary", category: "CDN_Pipeline", icon: <Globe size={24} />, level: "92%", color: "text-blue-400" },
        { name: "Tailwind CSS", category: "Styling_Interface", icon: <Hexagon size={24} />, level: "98%", color: "text-cyan-400" },
    ];

    return (
        <section id={id} className="relative bg-[#050505] py-32 px-6 overflow-hidden">
            {/* Background Branding Elements */}
            <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
                <Cpu size={400} strokeWidth={0.5} />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="mb-24">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="bg-gradient-to-r from-blue-600 via-indigo-700 to-slate-900 bg-clip-text text-transparent font-mono text-xs uppercase tracking-[0.6em] block">
                            Core_Architecture // 04
                        </span>
                        <div className="h-[1px] w-20 bg-gradient-to-r from-blue-600 to-indigo-900 opacity-30" />
                    </div>
                    <h2 className="text-7xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.8]">
                        THE <br />
                        <span className="text-transparent stroke-white">TECH MATRIX.</span>
                    </h2>
                </div>

                {/* Tech Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {coreStack.map((tech, index) => (
                        <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative p-8 bg-white/[0.02] border border-white/5 rounded-3xl hover:border-blue-500/30 hover:bg-white/[0.04] transition-all duration-500"
                        >
                            <div className="flex justify-between items-start mb-12">
                                <div className={`p-4 rounded-2xl bg-white/5 ${tech.color} group-hover:scale-110 transition-transform duration-500`}>
                                    {tech.icon}
                                </div>
                                <div className="text-right">
                                    <p className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest mb-1">System_Proficiency</p>
                                    <p className="text-xs font-mono text-white font-bold">{tech.level}</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-[10px] font-mono bg-gradient-to-r from-blue-600 via-indigo-700 to-slate-900 bg-clip-text text-transparent uppercase tracking-[0.4em] mb-2">{tech.category}</p>
                                <h3 className="text-3xl font-black uppercase italic tracking-tighter text-white group-hover:text-blue-500 transition-colors">
                                    {tech.name}
                                </h3>
                            </div>

                            {/* Matrix-style progress bar */}
                            <div className="mt-8 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: tech.level }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.5, ease: "circOut", delay: 0.5 }}
                                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-900"
                                />
                            </div>

                            {/* Decorative background number */}
                            <span className="absolute bottom-4 right-8 text-8xl font-black text-white/[0.02] italic pointer-events-none group-hover:text-blue-500/[0.05] transition-colors">
                                0{index + 1}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style>{`
                .stroke-white {
                    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
                }
            `}</style>
        </section>
    );
};

export default TechStack;
