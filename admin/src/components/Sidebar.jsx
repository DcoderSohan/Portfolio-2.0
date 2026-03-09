import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Briefcase, MessageSquare, Settings, LogOut, ExternalLink } from 'lucide-react';

const Sidebar = ({ setToken }) => {
    const menuItems = [
        { label: 'Overview', icon: <LayoutDashboard size={20} />, path: '/', end: true },
        { label: 'Projects', icon: <Briefcase size={20} />, path: '/projects' },
        { label: 'Messages', icon: <MessageSquare size={20} />, path: '/messages' },
    ];

    return (
        <aside className="hidden lg:flex w-72 border-r border-white/5 bg-[#080808] flex-col p-8 fixed h-full z-50">
            <div className="mb-12 px-2">
                <h2 className="text-2xl font-[900] italic tracking-tighter uppercase text-white">
                    Sohan<span className="bg-gradient-to-r from-blue-600 to-indigo-900 bg-clip-text text-transparent">.</span>Sarang
                </h2>
            </div>

            <nav className="flex-1 space-y-2">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
           relative group flex items-center gap-4 px-4 py-3 rounded-2xl transition-colors duration-500
           ${isActive ? 'text-white' : 'text-neutral-500 hover:text-white'}
         `}
                    >
                        {({ isActive }) => (
                            <>
                                {/* The Animated Background pill */}
                                {isActive && (
                                    <motion.div
                                        layoutId="sidebar-active"
                                        className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-700 to-indigo-950 rounded-2xl -z-10 shadow-lg shadow-blue-600/20"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}

                                {item.icon}
                                <span className="font-bold text-sm uppercase tracking-tight">{item.label}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="pt-6 border-t border-white/5">
                <button
                    onClick={() => setToken('')}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                >
                    <LogOut size={18} />
                    <span className="font-bold text-sm uppercase">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;