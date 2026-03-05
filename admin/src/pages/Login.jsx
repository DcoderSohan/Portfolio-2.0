import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Zap, Lock, Mail } from 'lucide-react';
import axios from 'axios';
import { backendUrl } from '../config';

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await axios.post(backendUrl + '/api/admin/login', { email, password });
            if (response.data.success) {
                setToken(response.data.token);
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            console.error(err);
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black">

            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-lg bg-[#0c0c0c] border border-white/10 rounded-[2.5rem] shadow-[0_0_100px_rgba(37,99,235,0.05)] overflow-hidden"
            >
                {/* Top Header Detail */}
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-50" />

                <div className="p-12 md:p-16">
                    {/* Brand/System Title */}
                    <div className="flex flex-col items-center gap-6 mb-12">
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-600/20 blur-2xl rounded-full" />
                            <div className="relative w-20 h-20 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center text-blue-500 shadow-inner">
                                <Cpu size={36} strokeWidth={1.5} />
                            </div>
                        </div>

                        <div className="text-center space-y-2">
                            <p className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.5em] font-bold">Authentication_Required</p>
                            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white leading-none">
                                Admin Control
                            </h2>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={onSubmitHandler} className="space-y-8">
                        <div className="space-y-6">
                            <div className="relative group">
                                <label className="absolute -top-3 left-6 bg-[#0c0c0c] px-2 text-[9px] font-mono uppercase tracking-[0.3em] text-blue-500 z-10">
                                    Access Identifier
                                </label>
                                <div className="relative flex items-center">
                                    <Mail className="absolute left-6 text-neutral-600 group-focus-within:text-blue-500 transition-colors" size={18} />
                                    <input
                                        type="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        placeholder="EMAIL_ADDRESS"
                                        required
                                        className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-5 pl-16 pr-6 text-sm font-bold text-white outline-none focus:border-blue-600 focus:bg-blue-600/5 transition-all placeholder:text-neutral-800"
                                    />
                                </div>
                            </div>

                            <div className="relative group">
                                <label className="absolute -top-3 left-6 bg-[#0c0c0c] px-2 text-[9px] font-mono uppercase tracking-[0.3em] text-blue-500 z-10">
                                    Security Protocol
                                </label>
                                <div className="relative flex items-center">
                                    <Lock className="absolute left-6 text-neutral-600 group-focus-within:text-blue-500 transition-colors" size={18} />
                                    <input
                                        type="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        placeholder="ACCESS_KEY"
                                        required
                                        className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-5 pl-16 pr-6 text-sm font-bold text-white outline-none focus:border-blue-600 focus:bg-blue-600/5 transition-all placeholder:text-neutral-800"
                                    />
                                </div>
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-mono uppercase tracking-widest text-center py-3 rounded-xl"
                            >
                                {error}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full group relative overflow-hidden py-6 bg-blue-600 text-white rounded-2xl transition-all active:scale-[0.98]"
                        >
                            <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                            <span className="relative z-10 font-black italic uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-3">
                                {loading ? "Decrypting..." : <>System Initialize <Zap size={14} /></>}
                            </span>
                        </button>
                    </form>

                    {/* Footer Detail */}
                    <div className="mt-12 flex items-center justify-between opacity-30 border-t border-white/5 pt-8">
                        <div className="flex items-center gap-3">
                            <ShieldCheck size={14} className="text-blue-500" />
                            <span className="text-[8px] font-mono uppercase tracking-widest">RSA_2048 Bit</span>
                        </div>
                        <span className="text-[8px] font-mono uppercase tracking-widest">Sohan.DB v1.0.4</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
