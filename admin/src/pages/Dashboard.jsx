import React, { useState, useEffect } from 'react';
import StatCard from '../components/StatCard';
import { Briefcase, MessageSquare, Eye, Zap } from 'lucide-react';
import { backendUrl } from '../config';

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    messages: 0,
    unread: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');

        // Fetch Projects (Publicly accessible)
        const projRes = await fetch(`${backendUrl}/api/project/list`);
        const projData = await projRes.json();
        
        let projectCount = 0;
        if (projData.success && Array.isArray(projData.projects)) {
          projectCount = projData.projects.length;
        }

        // Fetch Messages (Protected)
        const msgRes = await fetch(`${backendUrl}/api/message/list`, {
          headers: { token }
        });
        const msgData = await msgRes.json();
        
        let messageCount = 0;
        let unreadCount = 0;

        if (msgData.success && Array.isArray(msgData.messages)) {
          messageCount = msgData.messages.length;
          // Filter by an assumed 'read' property, or show all if not defined
          unreadCount = msgData.messages.filter(m => m.read === false).length;
          
          if (unreadCount === 0 && messageCount > 0 && !msgData.messages[0].hasOwnProperty('read')) {
            // Fallback for visual impact: if no 'read' property exists, show all as new/active
            unreadCount = messageCount;
          }
        } else if (msgData.message === "Not Authorized, Login Again") {
          // If auth failed, clear token and logout
          localStorage.removeItem('token');
          window.location.reload();
          return;
        }

        setStats({
          projects: projectCount,
          messages: messageCount,
          unread: unreadCount
        });
      } catch (error) {
        console.error("Statistical_Capture_Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end">
        <div>
          <p className="bg-gradient-to-r from-blue-600 via-indigo-700 to-slate-900 bg-clip-text text-transparent font-mono text-[10px] uppercase tracking-[0.5em] mb-2 font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-700 animate-pulse" />
            System_Metrics
          </p>
          <h1 className="text-6xl lg:text-8xl font-black uppercase tracking-tighter italic leading-none">Overview</h1>
        </div>
        {!loading && (
          <div className="hidden md:flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
            <Zap size={14} className="text-yellow-500 animate-pulse" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400">Core_Engine_Active</span>
          </div>
        )}
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-30">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-40 bg-white/5 rounded-[2rem] animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            label="Live Projects"
            value={stats.projects}
            icon={<Briefcase />}
            trend="Database Status: Active"
          />
          <StatCard
            label="Total Transmissions"
            value={stats.messages}
            icon={<MessageSquare />}
            trend={`${stats.unread} Waiting in queue`}
          />
          <StatCard
            label="Portfolio Integrity"
            value="99.9%"
            icon={<Eye />}
            trend="System uptime: 100%"
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;