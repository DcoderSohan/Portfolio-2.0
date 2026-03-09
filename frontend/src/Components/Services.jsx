import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Smartphone, Figma, Code, Terminal } from 'lucide-react';

const Services = ({ id }) => {
    const serviceOfferings = [
        {
            title: "Web Development",
            description: "Building high-performance, pixel-perfect web applications using the MERN stack. Focused on speed, SEO, and ultimate user experience.",
            icon: <Globe className="text-blue-500" size={32} />, // Icon color is handled via Tailwind in the JSX render bit below
            quote: "Architecture that scales with your ambition."
        },
        {
            title: "Backend Engineering",
            description: "Designing robust server-side architectures and secure APIs. Specialized in Node.js, Express, and complex database management with MongoDB.",
            icon: <Terminal className="text-blue-500" size={32} />,
            quote: "Logic that powers the modern web."
        },
        {
            title: "UI/UX Design",
            description: "Crafting minimalist, high-end interfaces that prioritize usability and brand identity. From wireframes to smooth interactive prototypes.",
            icon: <Figma className="text-blue-500" size={32} />,
            quote: "Design that speaks without saying a word."
        },
        {
            title: "App Development",
            description: "Creating cross-platform mobile solutions that feel native. Bridging the gap between web and mobile seamlessly.",
            icon: <Smartphone className="text-blue-500" size={32} />, // Icon color is handled via Tailwind in the JSX render bit below
            quote: "Innovation in the palm of your hand."
        }
    ];

    return (
        <section id={id} className="relative bg-[#050505] py-32 px-6 overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="mb-24 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-4 mb-6"
                    >
                        <div className="h-[1px] w-12 bg-gradient-to-r from-blue-600 to-indigo-900 opacity-30" />
                        <span className="bg-gradient-to-r from-blue-600 via-indigo-700 to-slate-900 bg-clip-text text-transparent font-mono text-xs uppercase tracking-[0.6em]">
                            System_Offerings // 04
                        </span>
                        <div className="h-[1px] w-12 bg-gradient-to-r from-blue-600 to-indigo-900 opacity-30" />
                    </motion.div>
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-none">
                        MY <span className="text-transparent stroke-white">SERVICES.</span>
                    </h2>
                </div>

                {/* Testimonial-Style Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {serviceOfferings.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative p-10 bg-white/[0.02] border border-white/5 rounded-[3rem] hover:border-blue-500/30 hover:bg-white/[0.04] transition-all duration-500 flex flex-col justify-between min-h-[400px]"
                        >
                            {/* Icon & Label */}
                            <div className="flex justify-between items-start mb-12">
                                <div className="p-5 rounded-2xl bg-white/5 bg-gradient-to-br group-hover:from-blue-600 group-hover:to-indigo-900 text-blue-500 group-hover:text-white transition-all duration-500 shadow-xl">
                                    {service.icon}
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-bold">Standard_Protocol</p>
                                    <p className="text-[10px] font-mono bg-gradient-to-r from-blue-600 via-indigo-700 to-slate-900 bg-clip-text text-transparent uppercase tracking-widest leading-none mt-1">S-0{index + 1}</p>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-6">
                                <h3 className="text-4xl font-black uppercase italic tracking-tighter text-white group-hover:text-blue-500 transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-neutral-400 text-lg leading-relaxed font-light">
                                    {service.description}
                                </p>
                            </div>

                            {/* Testimonial-style 'Quote' footer */}
                            <div className="mt-12 pt-8 border-t border-white/5 flex items-center gap-4">
                                <div className="w-8 h-[1px] bg-gradient-to-r from-blue-600 to-indigo-900" />
                                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500 italic">
                                    "{service.quote}"
                                </p>
                            </div>

                            {/* Subtle Background Pattern */}
                            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none">
                                <Hexagon size={120} />
                            </div>
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

import { Globe, Hexagon } from 'lucide-react';
export default Services;
