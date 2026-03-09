import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ label, value, icon, trend }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-neutral-900/40 border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden group"
  >
    <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-blue-600/20 transition-colors">
      {React.cloneElement(icon, { size: 80 })}
    </div>
    <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest mb-2">{label}</p>
    <h3 className="text-5xl font-black tracking-tighter">{value}</h3>
    {trend && (
      <span className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-900 bg-clip-text text-transparent text-[10px] font-bold mt-4 block">
        {trend}
      </span>
    )}
  </motion.div>
);

export default StatCard;