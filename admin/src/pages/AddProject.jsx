import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Cpu, ShieldCheck, Zap, ArrowLeft, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../config';

const AddProject = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('System_Ready');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        liveLink: '',
        tags: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus('Initializing_Transfer...');

        try {
            const bodyFormData = new FormData();
            bodyFormData.append('title', formData.title);
            bodyFormData.append('description', formData.description);
            bodyFormData.append('liveLink', formData.liveLink);
            bodyFormData.append('tags', JSON.stringify(formData.tags.split(',').map(tag => tag.trim())));
            bodyFormData.append('image', image);

            setStatus('Encrypting_Payload...');
            await new Promise(r => setTimeout(r, 500)); // Visual feedback

            setStatus('Uploading_to_Cloudinary...');
            const response = await fetch(`${backendUrl}/api/project/add`, {
                method: 'POST',
                headers: {
                    'token': localStorage.getItem('token')
                },
                body: bodyFormData
            });

            setStatus('Synchronizing_DB...');
            const data = await response.json();

            if (data.success) {
                setStatus('Operation_Successful');
                setTimeout(() => navigate('/projects'), 800);
            } else {
                setStatus('Critical_Failure');
                alert(data.message);
                setLoading(false);
            }
        } catch (error) {
            setStatus('IO_Error_Detected');
            console.error("Error adding project:", error);
            setLoading(false);
        }
    };

    return (
        <div className="space-y-12 pb-20">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <button
                        onClick={() => navigate('/projects')}
                        className="flex items-center gap-2 text-blue-500 font-mono text-xs uppercase tracking-[0.5em] mb-4 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={14} /> Back to Projects
                    </button>
                    <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter italic">Add Project</h1>
                </div>

                {/* STATUS BAR */}
                <div className="bg-blue-600/10 border border-blue-600/20 px-6 py-3 rounded-xl flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${loading ? 'bg-blue-500 animate-pulse' : 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]'}`} />
                    <div className="flex flex-col">
                        <span className="text-[8px] font-mono uppercase tracking-widest text-neutral-500">System_Status</span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white font-bold">{status}</span>
                    </div>
                </div>
            </div>

            <div className={`relative w-full max-w-5xl bg-[#0c0c0c] border border-white/10 rounded-[2rem] shadow-[0_0_100px_rgba(37,99,235,0.1)] flex flex-col md:flex-row overflow-hidden min-h-[600px] transition-all duration-500 ${loading ? 'opacity-50 pointer-events-none scale-[0.99]' : ''}`}>
                {/* LEFT PANEL */}
                <div className="w-full md:w-1/3 bg-blue-600/5 border-r border-white/5 p-10 flex flex-col justify-between overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Cpu size={120} strokeWidth={1} />
                    </div>
                    <div className="relative z-10">
                        <div className="w-12 h-1 bg-blue-600 mb-6" />
                        <p className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.4em] mb-4">Project_Module</p>
                        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white leading-none">
                            Initialize<br />Entry
                        </h2>
                    </div>
                    <div className="relative z-10 space-y-4 opacity-40">
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

                {/* RIGHT PANEL */}
                <div className="flex-1 p-8 md:p-12">
                    {loading && (
                        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                <p className="font-mono text-xs uppercase tracking-[0.5em] text-blue-500 animate-pulse">Processing_Request...</p>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-10">
                        {/* UPLOAD ZONE */}
                        <div className="relative group overflow-hidden p-8 border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent rounded-3xl flex flex-col items-center justify-center gap-4 hover:border-blue-600/30 transition-all cursor-pointer">
                            <input
                                type="file"
                                id="image"
                                hidden
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                                required
                            />
                            <label htmlFor="image" className="cursor-pointer flex flex-col items-center gap-4">
                                <div className="w-16 h-16 rounded-full border border-blue-600/20 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-2xl">
                                    {image ? <img className="w-full h-full object-cover rounded-full" src={URL.createObjectURL(image)} alt="" /> : <Upload size={24} />}
                                </div>
                                <p className="relative z-10 text-[9px] font-mono uppercase text-neutral-500 tracking-[0.4em]">
                                    {image ? image.name : "Select_Project_Image"}
                                </p>
                            </label>
                        </div>

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

                        <div className="relative group">
                            <label className="block text-[9px] font-mono uppercase tracking-[0.3em] text-neutral-500 mb-2">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 px-5 text-sm font-bold text-white outline-none focus:bg-blue-600/5 focus:border-blue-600 transition-all min-h-[120px]"
                            />
                        </div>

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

                        <button
                            type="submit"
                            className="w-full group relative overflow-hidden py-6 bg-blue-600 text-white rounded-2xl"
                        >
                            <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                            <span className="relative z-10 font-black italic uppercase tracking-[0.3em] text-xs">
                                Execute Deploy
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProject;
