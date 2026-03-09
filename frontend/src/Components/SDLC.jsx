import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SDLC = ({ id }) => {
    const containerRef = useRef(null);

    // Capture the vertical scroll progress of the container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const xPositions = [
        useTransform(scrollYProgress, [0, 1], ["20%", "-100%"]),
        useTransform(scrollYProgress, [0, 1], ["-100%", "20%"])
    ];

    const phases = [
        "Analysis", "Design", "Development", "Testing", "Deployment"
    ];

    return (
        <section
            id={id}
            ref={containerRef}
            className="relative bg-[#050505] py-12 lg:py-24 overflow-hidden border-t border-white/5"
        >
            <div className="absolute top-0 left-0 p-8 opacity-20 pointer-events-none z-20">
                <p className="bg-gradient-to-r from-blue-600 via-indigo-700 to-slate-900 bg-clip-text text-transparent font-mono text-[10px] uppercase tracking-[0.6em] font-bold">
                    Operational_Protocol // SDLC
                </p>
            </div>

            <div className="flex flex-col gap-6 relative">
                {/* Row 1: Auto + Scroll Linked */}
                <div className="overflow-hidden flex">
                    <motion.div
                        style={{ x: xPositions[0], willChange: "transform" }}
                        className="flex whitespace-nowrap gap-20"
                    >
                        {[...phases, ...phases, ...phases].map((phase, idx) => (
                            <h2 key={`${phase}-${idx}`} className="text-[12vw] font-black uppercase tracking-tighter leading-none italic flex items-center gap-12">
                                <span className="text-white">{phase}</span>
                                <span className="text-transparent stroke-white">/</span>
                            </h2>
                        ))}
                    </motion.div>
                </div>

                {/* Row 2: Auto + Scroll Linked (Reverse) */}
                <div className="overflow-hidden flex">
                    <motion.div
                        style={{ x: xPositions[1], willChange: "transform" }}
                        className="flex whitespace-nowrap gap-20 opacity-30"
                    >
                        {[...phases, ...phases, ...phases].reverse().map((phase, idx) => (
                            <h2 key={`${phase}-rev-${idx}`} className="text-[12vw] font-black uppercase tracking-tighter leading-none italic flex items-center gap-12">
                                <span className="text-transparent stroke-white">{phase}</span>
                                <span className="text-white/10 italic font-light font-mono text-3xl self-center tracking-widest">[PROCESS]</span>
                            </h2>
                        ))}
                    </motion.div>
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

export default SDLC;
