import React from 'react';
import { motion } from 'framer-motion';

const Capabilities = ({ id }) => {
    const caps = [
        { label: "Engineering", value: "Full-Stack MERN Architecture" },
        { label: "Interface", value: "High-End UI & Micro-Interactions" },
        { label: "Systems", value: "Secure APIs & Database Logic" },
        { label: "Deployment", value: "Scalable Cloud Integration" }
    ];

    return (
        <section id={id} className="bg-[#050505] py-24 px-6 border-t border-white/5">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-16">

                {/* Visual Label */}
                <div className="space-y-4">
                    <p className="bg-gradient-to-r from-blue-600 via-indigo-700 to-slate-900 bg-clip-text text-transparent font-mono text-[10px] uppercase tracking-[0.5em] font-bold">Capabilities // 04</p>
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic">Focus.</h2>
                </div>

                {/* Minimalist Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12 flex-1 max-w-3xl">
                    {caps.map((cap, index) => (
                        <motion.div
                            key={cap.label}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-2 group-hover:text-blue-500 transition-colors">
                                {cap.label}
                            </p>
                            <p className="text-xl font-bold uppercase tracking-tight text-white/90">
                                {cap.value}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Capabilities;
