import React from 'react';
import { motion } from 'framer-motion';

const AwardTestimonials = () => {
  const feedback = [
    {
      text: "Outstanding attention to detail. Sohan doesn't just code; he architects experiences.",
      client: "Alex Rivera",
      role: "CEO @ Quantum",
      color: "bg-blue-600"
    },
    {
      text: "The best React developer we've hired. His logic is clean, and his motion work is fluid.",
      client: "Sarah Chen",
      role: "Design Lead @ Stripe",
      color: "bg-indigo-600"
    },
    {
      text: "Brought our complex vision to life in weeks. A true partner in digital strategy.",
      client: "Jameson Hall",
      role: "Founder @ Vault",
      color: "bg-emerald-600"
    }
  ];

  return (
    <section className="relative min-h-screen bg-[#050505] py-24 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-start">

        {/* 1. STICKY SIDEBAR (Pinned on Scroll) */}
        <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit mb-20 lg:mb-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <span className="w-10 h-[1px] bg-gradient-to-r from-blue-600 to-indigo-900" />
              <p className="bg-gradient-to-r from-blue-600 via-indigo-700 to-slate-900 bg-clip-text text-transparent font-mono text-[10px] uppercase tracking-[0.6em]">Reputation</p>
            </div>
            <h2 className="text-white text-7xl font-black leading-none uppercase tracking-tighter">
              KIND<br />WORDS<br /><span className="text-transparent stroke-white italic">ONLY.</span>
            </h2>
            <p className="text-neutral-500 text-sm max-w-[250px] font-light leading-relaxed">
              Collaboration is the core of innovation. Here is what industry leaders say about our journey.
            </p>
          </motion.div>
        </div>

        {/* 2. THE SCROLLING SLABS */}
        <div className="lg:col-span-8 flex flex-col gap-24">
          {feedback.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 100, scale: 0.9, rotate: 2 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: false, margin: "-10%" }}
              className="relative group w-full bg-[#0a0a0a] border border-white/5 p-8 md:p-20 overflow-hidden"
            >
              {/* LARGE DYNAMIC ACCENT (Reveals on Scroll/Hover) */}
              <div className={`absolute -right-20 -top-20 w-64 h-64 ${item.color} rounded-full blur-[120px] opacity-20 group-hover:opacity-40 transition-opacity duration-700`} />

              {/* TESTIMONIAL CONTENT */}
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="mb-12">
                  <span className="text-white/10 text-9xl font-black absolute -top-10 -left-6 select-none">“</span>
                  <h3 className="text-white text-3xl md:text-5xl font-light leading-tight tracking-tight relative z-10">
                    {item.text}
                  </h3>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-10 border-t border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-neutral-800 border border-white/10 overflow-hidden">
                      <div className={`w-full h-full bg-gradient-to-tr ${item.color.replace('bg-', 'from-')} to-black opacity-50`} />
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg leading-none">{item.client}</p>
                      <p className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-900 bg-clip-text text-transparent font-mono text-[10px] uppercase tracking-widest mt-1">{item.role}</p>
                    </div>
                  </div>

                  <div className="hidden md:flex gap-1 text-blue-500">
                    {[...Array(5)].map((_, star) => (
                      <span key={star} className="text-xl">★</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. INTERACTIVE CORNER BUTTON (Case Study Link?) */}
              <div className="absolute top-0 right-0 p-4">
                <div className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-blue-500 group-hover:bg-blue-500 transition-all duration-500">
                  <span className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .stroke-white { -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.2); }
      `}</style>
    </section>
  );
};

export default AwardTestimonials;