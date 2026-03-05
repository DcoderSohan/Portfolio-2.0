import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, ShieldCheck, Cpu, Zap } from 'lucide-react';
import { backendUrl } from '../config';

const ProjectFormModal = ({ project, close, refresh }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        liveLink: '',
        tags: ''
    });

    useEffect(() => {
        if (project) {
            setFormData({
                title: project.title || '',
                description: project.description || '',
                image: project.image || '',
                liveLink: project.liveLink || '',
                tags: project.tags ? project.tags.join(', ') : ''
            });
        }
    }, [project]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = project
            ? `${backendUrl}/api/project/update/${project._id}`
            : `${backendUrl}/api/project/add`;

        const projectData = {
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim())
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify(projectData)
            });
            const data = await response.json();
            if (data.success) {
                refresh();
                close();
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error saving project:", error);
        }
    };

    // Sophisticated Spring Transition
    const springTransition = { type: "spring", damping: 25, stiffness: 200 };

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">

            {/* 1. LAYERED BACKDROP */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={close}
                className="absolute inset-0 bg-[#050505]/80 backdrop-blur-[20px]"
            />

            {/* 2. THE MODAL CONTAINER */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0, rotateX: 15 }}
                animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                exit={{ scale: 0.8, opacity: 0, rotateX: -15 }}
                transition={springTransition}
                className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c0c0c] border border-white/10 rounded-[2rem] shadow-[0_0_100px_rgba(37,99,235,0.1)] flex flex-col md:flex-row overflow-hidden"
            >

                {/* LEFT PANEL: SYSTEM INFO (Modern Detail) */}
                <div className="w-full md:w-1/3 bg-blue-600/5 border-r border-white/5 p-10 flex flex-col justify-between overflow-hidden relative min-h-[200px] md:min-h-0">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Cpu size={120} strokeWidth={1} />
                    </div>

                    <div className="relative z-10">
                        <div className="w-12 h-1 bg-blue-600 mb-6" />
                        <p className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.4em] mb-4">Project_Module</p>
                        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white leading-none">
                            {project ? 'Override\nSystem' : 'Initialize\nEntry'}
                        </h2>
                    </div>

                    <div className="relative z-10 space-y-4 opacity-40 hidden md:block">
                        <div className="flex items-center gap-3">
                            <ShieldCheck size={14} className="text-blue-500" />
                            <span className="text-[9px] font-mono uppercase tracking-widest text-white">Encryption Active</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Zap size={14} className="text-blue-500" />
                            <span className="text-[9px] font-mono uppercase tracking-widest text-white">Sohan.DB Protocol</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT PANEL: DATA ENTRY */}
                <div className="flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar">

                    {/* CLOSE BUTTON (Floating) */}
                    <button
                        onClick={close}
                        className="absolute top-6 right-6 p-2 text-neutral-600 hover:text-white transition-colors"
                    >
                        <X size={24} strokeWidth={1} />
                    </button>

                    <form onSubmit={handleSubmit} className="space-y-10">
                        {/* INPUT GROUP 1: Title */}
                        <div className="relative group">
                            <label className="absolute -top-3 left-4 bg-[#0c0c0c] px-2 text-[9px] font-mono uppercase tracking-[0.3em] text-blue-500 z-10">
                                Primary Identity (Title)
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="PROJECT NAME..."
                                required
                                className="w-full bg-transparent border-b-2 border-white/5 py-4 px-4 text-xl font-black italic uppercase text-white outline-none focus:border-blue-600 transition-all placeholder:text-neutral-800"
                            />
                        </div>

                        {/* INPUT GROUP 2: Description */}
                        <div className="relative group">
                            <label className="block text-[9px] font-mono uppercase tracking-[0.3em] text-neutral-500 mb-2">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 px-5 text-sm font-bold text-white outline-none focus:bg-blue-600/5 focus:border-blue-600 transition-all min-h-[100px]"
                            />
                        </div>

                        {/* INPUT GROUP 3: Links & Tags */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="relative group">
                                <label className="block text-[9px] font-mono uppercase tracking-[0.3em] text-neutral-500 mb-2">Live Link</label>
                                <input
                                    type="url"
                                    name="liveLink"
                                    value={formData.liveLink}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 px-5 text-sm font-bold text-white outline-none focus:bg-blue-600/5 focus:border-blue-600 transition-all"
                                />
                            </div>
                            <div className="relative group">
                                <label className="block text-[9px] font-mono uppercase tracking-[0.3em] text-neutral-500 mb-2">Tags (Comma separated)</label>
                                <input
                                    type="text"
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleChange}
                                    required
                                    placeholder="React, Node.js, Tailwind..."
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 px-5 text-sm font-bold text-white outline-none focus:bg-blue-600/5 focus:border-blue-600 transition-all"
                                />
                            </div>
                        </div>

                        {/* INPUT GROUP 4: Image URL */}
                        <div className="relative group">
                            <label className="block text-[9px] font-mono uppercase tracking-[0.3em] text-neutral-500 mb-2">Image URL</label>
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                required
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 px-5 text-sm font-bold text-white outline-none focus:bg-blue-600/5 focus:border-blue-600 transition-all"
                            />
                        </div>

                        {/* ACTION BUTTON */}
                        <button
                            type="submit"
                            className="w-full group relative overflow-hidden py-6 bg-blue-600 text-white rounded-2xl"
                        >
                            <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                            <span className="relative z-10 font-black italic uppercase tracking-[0.3em] text-xs">
                                {project ? 'Commit Changes' : 'Execute Deploy'}
                            </span>
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default ProjectFormModal;
