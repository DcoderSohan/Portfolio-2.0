import { useState } from 'react';

const Sidebar = ({ activePage, setActivePage, onItemClick }) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: '⌂' },
    { id: 'about', label: 'About', icon: '⚡' },
    { id: 'projects', label: 'Projects', icon: '▣' },
    { id: 'contact', label: 'Contact', icon: '◉' },
  ];

  const handleClick = (pageId) => {
    setActivePage(pageId);
    if (onItemClick) {
      onItemClick();
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-black border-r border-green-500/30 flex flex-col z-50">
      {/* Portfolio Header */}
      <div className="p-6 border-b border-green-500/30">
        <div className="space-y-4">
          <h1 className="text-green-400 font-mono text-xl font-bold tracking-wider">
            {'>'} PORTFOLIO
          </h1>
          
          {/* Admin Image */}
          <div className="flex justify-center">
            <img
              src="/Me2.jpg"
              alt="Sohan Sarang"
              className="w-24 h-24 rounded-full border-2 border-green-500/50 object-cover hover:border-green-400 transition-all duration-300 hover:scale-105"
            />
          </div>

          <div className="text-green-500/80 font-mono text-sm">
            <div className="flex items-center gap-2 justify-center">
              <span className="text-green-400">$</span>
              <span className="animate-pulse">whoami</span>
            </div>
            <div className="mt-2 text-base text-green-300 font-semibold text-center">
              Sohan Sarang
            </div>
            <div className="mt-1 text-xs text-green-300/60 text-center">
              Full Stack Developer
            </div>
          </div>

          {/* Location and Social Links */}
          <div className="pt-4 mt-4 border-t border-green-500/20 space-y-3">
            {/* Location */}
            <div className="text-xs text-green-500/50 font-mono">
              <div className="text-green-400 mb-2">{'>'} Location</div>
              <div className="flex items-center justify-center gap-2 text-green-300/70">
                <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C7.589 0 4 3.589 4 8c0 4.245 7.455 15.308 7.702 15.617.247.309.551.383.298.383s.551-.074.298-.383C12.545 23.308 20 12.245 20 8c0-4.411-3.589-8-8-8zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/>
                </svg>
                <span className="text-xs">Mumbai, India</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-3 border-t border-green-500/20">
              <div className="text-green-400 text-xs font-mono mb-2">{'>'} Social</div>
              <div className="flex gap-2 justify-center">
                <a
                  href="https://github.com/DcoderSohan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 transition-colors"
                  title="GitHub"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/sohan-sarang"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 transition-colors"
                  title="LinkedIn"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a
                  href="https://wa.me/919359770332"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 transition-colors"
                  title="WhatsApp"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.375a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>
                <a
                  href="mailto:sohansarang05@email.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 transition-colors"
                  title="Email"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-hide">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={`w-full text-left px-4 py-3 font-mono text-sm transition-all duration-200 border ${
              activePage === item.id
                ? 'bg-green-500/20 border-green-500 text-green-400 shadow-lg shadow-green-500/20'
                : 'border-green-500/20 text-green-300/70 hover:border-green-500/50 hover:text-green-400 hover:bg-green-500/10'
            }`}
          >
            <span className="mr-2">{item.icon}</span>
            {item.label}
            {activePage === item.id && (
              <span className="ml-2 text-green-400 animate-pulse">_</span>
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-green-500/30">
        <div className="text-xs text-green-500/50 font-mono">
          <div className="flex items-center gap-2">
            <span className="text-green-400">$</span>
            <span>status: online</span>
          </div>
          <div className="mt-1 text-green-500/30">
            {'>'} v2.0
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

