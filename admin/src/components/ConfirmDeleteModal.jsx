import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, AlertTriangle } from 'lucide-react';

const ConfirmDeleteModal = ({ name, onConfirm, close }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        onClick={close} 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm" 
      />

      {/* Modal Body */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-md bg-neutral-900 border border-white/10 rounded-[2.5rem] p-8 md:p-12 text-center shadow-2xl"
      >
        {/* Warning Icon Animation */}
        <div className="relative w-24 h-24 mx-auto mb-8">
            <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 bg-red-500/20 rounded-full blur-xl"
            />
            <div className="relative w-full h-full bg-red-500/10 text-red-500 rounded-full flex items-center justify-center border border-red-500/20">
                <Trash2 size={40} />
            </div>
        </div>

        <h3 className="text-3xl font-black uppercase italic tracking-tighter text-white mb-4">
            Hold Up!
        </h3>
        
        <p className="text-neutral-400 text-sm font-medium leading-relaxed mb-10">
            You are about to delete <span className="text-white font-bold underline decoration-red-500">{name}</span>. 
            This action is permanent and cannot be reversed.
        </p>
        
        <div className="flex flex-col gap-3">
          <button 
            onClick={onConfirm} 
            className="w-full bg-red-600 hover:bg-red-700 text-white py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-lg shadow-red-600/20 active:scale-[0.98]"
          >
            Confirm Deletion
          </button>
          
          <button 
            onClick={close} 
            className="w-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all"
          >
            Nevermind, Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// CRITICAL FIX: Add this line to resolve your SyntaxError
export default ConfirmDeleteModal;