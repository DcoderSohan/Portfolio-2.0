import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal'
import { backendUrl } from '../config';
import { useNavigate } from 'react-router-dom';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const navigate = useNavigate();

  // Fetch projects from backend
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/project/list`);
      const data = await response.json();
      if (data.success) {
        setProjects(data.projects);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handlers
  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      const response = await fetch(`${backendUrl}/api/project/remove/${id}`, {
        method: 'DELETE',
        headers: {
          'token': localStorage.getItem('token')
        }
      });
      const data = await response.json();
      if (data.success) {
        setProjects(prev => prev.filter(p => p._id !== id));
        setConfirmDeleteId(null);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error deleting project:", error);
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
            System_Inventory
          </p>
          <h1 className="text-6xl lg:text-8xl font-black uppercase tracking-tighter italic leading-none">
            Projects
          </h1>
        </div>
        <button
          onClick={() => navigate('/projects/add')}
          className="group relative overflow-hidden bg-white text-black px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all flex items-center gap-3 active:scale-95"
        >
          <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <Plus size={18} className="relative z-10 group-hover:text-white" />
          <span className="relative z-10 group-hover:text-white">Initialize_New_Entry</span>
        </button>
      </div>

      {/* PROJECT LIST */}
      <div className="grid gap-6">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4 opacity-30">
            <div className="w-12 h-12 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="font-mono text-[9px] uppercase tracking-[0.4em]">Synchronizing_Data...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="py-20 border border-white/5 bg-white/[0.01] rounded-[2.5rem] flex flex-col items-center justify-center gap-4 italic opacity-40">
            <p className="text-xl font-bold uppercase tracking-widest">No Records Found</p>
            <p className="font-mono text-[9px] uppercase tracking-[0.3em]">System_Empty_State</p>
          </div>
        ) : (
          projects.map((p) => (
            <motion.div
              layout
              key={p._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden bg-[#0c0c0c] border border-white/5 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-start md:items-center justify-between group hover:border-blue-500/30 transition-all gap-8"
            >
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-[1px] bg-blue-600" />
                  <p className="text-neutral-500 font-mono text-[9px] uppercase tracking-widest">{p.tags.join(' // ')}</p>
                </div>
                <h4 className="text-3xl font-black uppercase italic tracking-tighter text-white group-hover:text-blue-500 transition-colors">
                  {p.title}
                </h4>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto mt-4 md:mt-0">
                <AnimatePresence mode="wait">
                  {confirmDeleteId === p._id ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex items-center gap-3 w-full md:w-auto"
                    >
                      <p className="font-mono text-[8px] uppercase tracking-widest text-red-500 mr-2">Confirm_Purge?</p>
                      <button
                        disabled={deletingId === p._id}
                        onClick={() => handleDelete(p._id)}
                        className="flex-1 md:flex-none px-6 py-3 bg-red-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-700 transition-all disabled:opacity-50"
                      >
                        {deletingId === p._id ? 'Purging...' : 'Execute'}
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(null)}
                        className="flex-1 md:flex-none px-6 py-3 bg-white/5 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all"
                      >
                        Abort
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3 w-full md:w-auto"
                    >
                      <button
                        onClick={() => navigate(`/projects/edit/${p._id}`)}
                        className="flex-1 md:flex-none p-4 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-blue-600 hover:text-white transition-all group/btn"
                      >
                        <Edit2 size={18} className="group-hover/btn:scale-110 transition-transform" />
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(p._id)}
                        className="flex-1 md:flex-none p-4 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-red-600 hover:text-white transition-all group/btn"
                      >
                        <Trash2 size={18} className="group-hover/btn:scale-110 transition-transform" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Projects;
