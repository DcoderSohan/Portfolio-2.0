import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Globe, Cpu } from 'lucide-react';

const SuccessModal = ({ message, subtext, onClose }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onClose, 200);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="relative w-full max-w-lg bg-neutral-900 border border-white/10 rounded-[3rem] p-12 text-center overflow-hidden"
            >
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <Cpu size={150} />
                </div>

                {/* Success Icon */}
                <div className="relative mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.2, 1] }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto border border-green-500/30 shadow-[0_0_50px_rgba(34,197,94,0.3)]"
                    >
                        <CheckCircle2 size={48} />
                    </motion.div>
                    
                    {/* Ring Animation */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="absolute inset-0 border-2 border-green-500 rounded-full"
                    />
                </div>

                <div className="relative z-10 space-y-4">
                    <h3 className="text-4xl font-black uppercase italic tracking-tighter text-white">
                        {message || "Execution_Successful"}
                    </h3>
                    <p className="text-neutral-400 font-mono text-[10px] uppercase tracking-[0.4em] leading-relaxed">
                        {subtext || "Data integrity verified // System synchronized"}
                    </p>
                </div>

                {/* Progress Bar Container */}
                <div className="mt-12 space-y-2">
                    <div className="flex justify-between text-[8px] font-mono text-neutral-600 uppercase tracking-widest px-2">
                        <span>Redirecting...</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="h-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.8)]"
                        />
                    </div>
                </div>

                {/* Bottom Detail */}
                <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-center gap-4 text-white/20">
                    <Globe size={14} className="animate-pulse" />
                    <span className="text-[8px] font-mono uppercase tracking-[0.5em]">Sohan.DB Network // Protocol 03</span>
                </div>
            </motion.div>
        </div>
    );
};

export default SuccessModal;
