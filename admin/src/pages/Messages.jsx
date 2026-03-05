import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Mail, Phone, User, Calendar, MessageSquare } from 'lucide-react';
import { backendUrl } from '../config';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/message/list`, {
        headers: {
          'token': localStorage.getItem('token')
        }
      });
      const data = await response.json();
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      const response = await fetch(`${backendUrl}/api/message/remove/${id}`, {
        method: 'DELETE',
        headers: {
          'token': localStorage.getItem('token')
        }
      });
      const data = await response.json();
      if (data.success) {
        setMessages(prev => prev.filter(m => m._id !== id));
        setConfirmDeleteId(null);
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-12">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <p className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-2 font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Incoming_Signals
          </p>
          <h1 className="text-6xl lg:text-8xl font-black uppercase tracking-tighter italic leading-none">
            Messages
          </h1>
        </div>
        <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl flex items-center gap-4">
          <MessageSquare size={20} className="text-blue-500" />
          <div className="flex flex-col">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">Total_Queue</span>
            <span className="text-xl font-black italic uppercase leading-none">{messages.length}</span>
          </div>
        </div>
      </div>

      {/* MESSAGES LIST */}
      <div className="grid gap-6">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4 opacity-30">
            <div className="w-12 h-12 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="font-mono text-[9px] uppercase tracking-[0.4em]">Intercepting_Transmissions...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="py-20 border border-white/5 bg-white/[0.01] rounded-[2.5rem] flex flex-col items-center justify-center gap-4 italic opacity-40">
            <p className="text-xl font-bold uppercase tracking-widest">Silence Detected</p>
            <p className="font-mono text-[9px] uppercase tracking-[0.3em]">No_New_Transmissions</p>
          </div>
        ) : (
          messages.map((m) => (
            <motion.div
              layout
              key={m._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0c0c0c] border border-white/5 rounded-[2.5rem] overflow-hidden group hover:border-blue-500/30 transition-all"
            >
              <div className="p-8 flex flex-col lg:flex-row gap-8">
                {/* Sender Info */}
                <div className="lg:w-1/3 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-500">
                      <User size={18} />
                    </div>
                    <div>
                      <p className="text-[8px] font-mono uppercase tracking-widest text-neutral-500">Identity</p>
                      <h4 className="text-lg font-black uppercase italic leading-none">{m.name}</h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-neutral-400">
                      <Mail size={16} />
                    </div>
                    <div>
                      <p className="text-[8px] font-mono uppercase tracking-widest text-neutral-500">Address</p>
                      <p className="text-[10px] font-mono text-neutral-300">{m.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-neutral-400">
                      <Phone size={16} />
                    </div>
                    <div>
                      <p className="text-[8px] font-mono uppercase tracking-widest text-neutral-500">Line</p>
                      <p className="text-[10px] font-mono text-neutral-300">{m.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-neutral-400">
                      <Calendar size={16} />
                    </div>
                    <div>
                      <p className="text-[8px] font-mono uppercase tracking-widest text-neutral-500">Logged</p>
                      <p className="text-[10px] font-mono text-neutral-300">{new Date(m.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Message Content */}
                <div className="flex-1 lg:pl-8 lg:border-l border-white/5 flex flex-col justify-between">
                  <div className="space-y-4">
                    <p className="text-[8px] font-mono uppercase tracking-[0.4em] text-blue-500">Transmission_Body</p>
                    <p className="text-neutral-300 text-xl leading-relaxed italic">
                      "{m.message}"
                    </p>
                  </div>

                  <div className="mt-8 flex justify-end items-center gap-4">
                    <AnimatePresence mode="wait">
                      {confirmDeleteId === m._id ? (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="flex items-center gap-3"
                        >
                          <p className="font-mono text-[8px] uppercase tracking-widest text-red-500">Purge_Transmission?</p>
                          <button
                            disabled={deletingId === m._id}
                            onClick={() => handleDelete(m._id)}
                            className="px-6 py-3 bg-red-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-700 transition-all disabled:opacity-50"
                          >
                            {deletingId === m._id ? 'Purging...' : 'Execute'}
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            className="px-6 py-3 bg-white/5 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all"
                          >
                            Abort
                          </button>
                        </motion.div>
                      ) : (
                        <motion.button
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          onClick={() => setConfirmDeleteId(m._id)}
                          className="p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-red-600 hover:text-white transition-all group/btn"
                        >
                          <Trash2 size={18} />
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Messages;