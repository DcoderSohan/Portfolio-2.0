import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Linkedin, Twitter, ArrowUpRight, Globe } from 'lucide-react';

const ContactPage = () => {
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState('System_Idle');
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('Initializing_Transmission...');

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
      const response = await fetch(`${backendUrl}/api/message/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (data.success) {
        setStatus('Transmission_Successful');
        setFormData({ name: '', email: '', phone: '', message: '' });
        // Success notification is handled by the UI rendering a special state
      } else {
        setStatus('Critical_Failure');
        alert(data.message);
      }
    } catch (error) {
      setStatus('IO_Error');
      console.error("Transmission Error:", error);
    } finally {
      setLoading(false);
      setTimeout(() => setStatus('System_Idle'), 3000);
    }
  };

  const socials = [
    { name: "LinkedIn", link: "https://linkedin.com/in/sohan-sarang", icon: <Linkedin size={18} /> },
    { name: "GitHub", link: "https://github.com/DcoderSohan", icon: <Github size={18} /> }
  ];

  return (
    <div className="relative min-h-screen bg-[#050505] text-white py-20 px-6 overflow-hidden relative">

      {/* 1. BACKGROUND GLOWS */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-indigo-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 relative z-10">

        {/* LEFT SIDE: THE PITCH */}
        <div className="lg:col-span-5 space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-blue-500 font-mono text-xs uppercase tracking-[0.6em] block">
                Transmission // 03
              </span>
              <div className="flex items-center gap-2 bg-blue-600/10 border border-blue-600/20 px-3 py-1 rounded-full">
                <div className={`w-1.5 h-1.5 rounded-full ${loading ? 'bg-blue-500 animate-pulse' : 'bg-green-500'}`} />
                <span className="text-[8px] font-mono uppercase tracking-widest text-blue-400">{status}</span>
              </div>
            </div>
            <h1 className="text-7xl md:text-8xl font-black tracking-tighter leading-[0.8] uppercase mb-8">
              START A <br />
              <span className="text-transparent stroke-white italic">PROJECT.</span>
            </h1>
            <p className="text-neutral-400 text-lg font-light leading-relaxed max-w-md">
              Whether you have a fully baked idea or just a spark, let’s build something that redefines the standard.
            </p>
          </motion.div>

          {/* Social Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {socials.map((social, i) => (
              <motion.a
                key={social.name}
                href={social.link}
                target='_blank'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="group flex items-center justify-between p-4 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/[0.08] transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-neutral-500 group-hover:text-blue-500 transition-colors">{social.icon}</span>
                  <span className="text-xs font-mono uppercase tracking-widest">{social.name}</span>
                </div>
                <ArrowUpRight size={14} className="text-neutral-700 group-hover:text-white transition-all" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: THE INTERACTIVE FORM */}
        <motion.div
          className="lg:col-span-7 bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-[2rem] backdrop-blur-3xl relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {loading && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 rounded-[2rem] backdrop-blur-sm">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-blue-500 animate-pulse">Encoding_Signal...</p>
              </div>
            </div>
          )}

          {status === 'Transmission_Successful' && (
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
              className="absolute inset-0 z-[60] flex items-center justify-center bg-green-500/10 rounded-[2rem]"
            >
              <div className="bg-black/80 border border-green-500/30 p-10 rounded-3xl flex flex-col items-center text-center gap-6 shadow-2xl">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 scale-125">
                  <Globe size={40} className="animate-pulse" />
                </div>
                <div>
                  <h3 className="text-3xl font-black uppercase italic tracking-tighter text-white mb-2">Signal Received</h3>
                  <p className="text-neutral-400 font-mono text-[10px] uppercase tracking-widest">Transmission_Secure // Integrity_100%</p>
                </div>
                <button
                  onClick={() => setStatus('System_Idle')}
                  className="px-8 py-3 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-green-500 hover:text-white transition-all"
                >
                  Dismiss_Overlay
                </button>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2 relative">
                <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500 ml-1">Identity</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full bg-white/[0.03] border-b border-white/10 p-4 focus:border-blue-600 focus:outline-none transition-all placeholder:text-neutral-700 text-white rounded-t-lg"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500 ml-1">Direct Line (Email)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  required
                  className="w-full bg-white/[0.03] border-b border-white/10 p-4 focus:border-blue-600 focus:outline-none transition-all placeholder:text-neutral-700 text-white rounded-t-lg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500 ml-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                required
                className="w-full bg-white/[0.03] border-b border-white/10 p-4 focus:border-blue-600 focus:outline-none transition-all placeholder:text-neutral-700 text-white rounded-t-lg"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500 ml-1">The Mission</label>
              <textarea
                rows="5"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Briefly describe your vision..."
                required
                className="w-full bg-white/[0.03] border-b border-white/10 p-4 focus:border-blue-600 focus:outline-none transition-all placeholder:text-neutral-700 text-white rounded-t-lg resize-none"
              ></textarea>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 hover:bg-white hover:text-black py-6 rounded-2xl flex items-center justify-center gap-4 text-xs font-black uppercase tracking-[0.5em] transition-all duration-500 group shadow-[0_0_30px_rgba(37,99,235,0.2)] disabled:bg-neutral-800 disabled:text-neutral-500"
            >
              {loading ? 'Transmitting...' : 'Initiate Contact'}
              <Send size={16} className={`group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform ${loading ? 'opacity-0' : ''}`} />
            </motion.button>

            <p className="text-center text-[10px] font-mono text-neutral-600 tracking-widest uppercase">
              Average response time: &lt; 24 Hours
            </p>
          </form>
        </motion.div>
      </div>

      <style>{`
        .stroke-white {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
};

export default ContactPage;