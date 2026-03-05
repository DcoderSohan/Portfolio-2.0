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

        // Fetch Projects
        const projRes = await fetch(`${backendUrl}/api/project/list`);
        const projData = await projRes.json();

        // Fetch Messages
        const msgRes = await fetch(`${backendUrl}/api/message/list`, {
          headers: { token }
        });
        const msgData = await msgRes.json();

        if (projData.success && msgData.success) {
          setStats({
            projects: projData.projects.length,
            messages: msgData.messages.length,
            unread: msgData.messages.filter(m => {
              // Assuming we might add a 'read' status later, for now just show total as "active"
              return true;
            }).length
          });
        }
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
          <p className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-2 font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
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