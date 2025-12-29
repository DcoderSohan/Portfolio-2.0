import { useState, useEffect } from 'react';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    setIsOpening(true);
    // Trigger animation after a tiny delay to ensure smooth transition
    setTimeout(() => setIsOpening(false), 10);
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
      setSelectedProject(null);
    }, 250); // Match animation duration
  };

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isModalOpen, isClosing]);

  const projects = [
    {
      id: 1,
      name: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration',
      fullDescription: 'A comprehensive full-stack e-commerce platform built with modern web technologies. Features include user authentication, product catalog management, shopping cart functionality, secure payment processing with Stripe integration, order management system, and admin dashboard. The platform supports multiple payment methods, real-time inventory updates, and responsive design for optimal user experience across all devices.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      status: 'completed',
      category: 'full-stack',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
      liveLink: 'https://example.com',
      githubLink: 'https://github.com/example/ecommerce',
    },
    {
      id: 2,
      name: 'Task Management App',
      description: 'Real-time collaborative task management system',
      fullDescription: 'A real-time collaborative task management application that enables teams to work together seamlessly. Built with Socket.io for real-time updates, the app features task creation, assignment, priority setting, due date tracking, and team collaboration. Includes features like drag-and-drop task organization, file attachments, comments, notifications, and progress tracking. The backend uses PostgreSQL for reliable data storage and Express.js for API endpoints.',
      tech: ['React', 'Socket.io', 'PostgreSQL', 'Express'],
      status: 'completed',
      category: 'full-stack',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop',
      liveLink: 'https://example.com',
      githubLink: 'https://github.com/example/taskmanager',
      demoLink: 'https://demo.example.com',
    },
    {
      id: 3,
      name: 'AI Chatbot',
      description: 'Intelligent chatbot using machine learning',
      fullDescription: 'An intelligent AI-powered chatbot application that leverages machine learning and natural language processing. The chatbot can understand context, provide accurate responses, and learn from interactions. Built with TensorFlow for machine learning models, Flask for the backend API, and React for the frontend interface. Features include conversation history, sentiment analysis, multi-language support, and integration capabilities with various platforms.',
      tech: ['Python', 'TensorFlow', 'Flask', 'React'],
      status: 'in-progress',
      category: 'full-stack',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
      liveLink: 'https://example.com',
      githubLink: 'https://github.com/example/chatbot',
      demoLink: 'https://demo.example.com',
    },
    {
      id: 4,
      name: 'Portfolio Website',
      description: 'Modern portfolio website with dark theme',
      fullDescription: 'A modern, responsive portfolio website showcasing projects and skills with a sleek dark theme. Built with React and Tailwind CSS, the site features smooth animations, interactive components, and a terminal-inspired design aesthetic. Includes sections for about, projects, skills, and contact. The website is fully responsive, optimized for performance, and provides an engaging user experience with custom animations and transitions.',
      tech: ['React', 'Tailwind CSS', 'Vite'],
      status: 'completed',
      category: 'frontend',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=400&fit=crop',
      liveLink: 'https://example.com',
      githubLink: 'https://github.com/example/portfolio',
      demoLink: 'https://demo.example.com',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'full-stack', label: 'Full Stack' },
    { id: 'mobile', label: 'Mobile' },
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const handleShareProject = async () => {
    if (!selectedProject) return;
    
    const shareData = {
      title: selectedProject.name,
      text: selectedProject.description,
      url: selectedProject.liveLink || window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        const textToCopy = `${selectedProject.name}\n${selectedProject.description}\n${selectedProject.liveLink || ''}`;
        await navigator.clipboard.writeText(textToCopy);
        alert('Project link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
      // Fallback: Copy to clipboard
      const textToCopy = `${selectedProject.name}\n${selectedProject.description}\n${selectedProject.liveLink || ''}`;
      await navigator.clipboard.writeText(textToCopy);
      alert('Project link copied to clipboard!');
    }
  };

  // Different animation styles for each card
  const getAnimationClass = (index) => {
    const animations = [
      'animate-fade-in-up hover:animate-glow-pulse',
      'animate-slide-in-left hover:animate-scale-up',
      'animate-fade-in-right hover:animate-border-pulse',
      'animate-fade-in-up hover:animate-glow-pulse',
    ];
    return animations[index % animations.length];
  };

  const getHoverEffect = (index) => {
    const effects = [
      'hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:-translate-y-1',
      'hover:scale-105 hover:rotate-1',
      'hover:border-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)]',
      'hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:-translate-y-1',
    ];
    return effects[index % effects.length];
  };

  return (
    <div className="min-h-screen p-8 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 border border-green-500/30 bg-black/50 p-4">
          <div className="flex items-center gap-2">
            <span className="text-green-400 font-mono text-sm">{'>'}</span>
            <span className="text-green-300 font-mono text-sm">projects.list</span>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="mb-6 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`font-mono text-xs md:text-sm px-4 py-2 border transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'border-green-500 bg-green-500/20 text-green-400 shadow-lg shadow-green-500/20'
                  : 'border-green-500/30 text-green-300/70 hover:border-green-500/50 hover:text-green-400 hover:bg-green-500/10'
              }`}
            >
              {category.label}
              {selectedCategory === category.id && (
                <span className="ml-2 text-green-400 animate-pulse">_</span>
              )}
            </button>
          ))}
        </div>

        {/* Grid Layout: 1 col mobile, 2 cols tablet, 3 cols desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => handleProjectClick(project)}
              className={`border border-green-500/30 bg-black/30 backdrop-blur-sm overflow-hidden transition-all duration-300 cursor-pointer ${getAnimationClass(index)} ${getHoverEffect(index)}`}
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both',
              }}
            >
              {/* Project Image */}
              {project.image && (
                <div className="w-full h-40 overflow-hidden bg-black/50 relative group">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              )}
              
              <div className="p-4">
                <div className="mb-2">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-mono font-bold text-green-400 line-clamp-1 flex-1">
                      {'>'} {project.name}
                    </h3>
                  </div>
                  {/* Category and Status Badges - New Lines */}
                  <div className="space-y-1.5 mb-2">
                    {/* Category */}
                    <div className="flex items-center gap-1">
                      <span className="text-green-500 font-mono text-xs">category:</span>
                      <span className="border border-blue-500/50 text-blue-400 bg-blue-500/10 font-mono text-xs px-2 py-0.5 capitalize">
                        {project.category.replace('-', ' ')}
                      </span>
                    </div>
                    {/* Status */}
                    <div className="flex items-center gap-1">
                      <span className="text-green-500 font-mono text-xs">status:</span>
                      <span
                        className={`font-mono text-xs px-2 py-0.5 border ${
                          project.status === 'completed'
                            ? 'border-green-500/50 text-green-400 bg-green-500/10'
                            : 'border-yellow-500/50 text-yellow-400 bg-yellow-500/10'
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 font-mono text-xs mb-3 leading-relaxed line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="border border-green-500/20 bg-black/50 px-2 py-0.5 text-green-300 font-mono text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="border border-green-500/20 bg-black/50 px-2 py-0.5 text-green-300/60 font-mono text-xs">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>
                
                {/* Click to View Button */}
                <div className="pt-3 border-t border-green-500/20">
                  <div className="inline-flex items-center gap-1.5 border border-green-500/50 bg-green-500/10 text-green-400 font-mono text-xs px-3 py-1.5 hover:bg-green-500/20 hover:border-green-500 transition-all duration-200 w-full justify-center">
                    <span>{'>'}</span>
                    <span>View Details</span>
                    <span className="text-green-500">→</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>

        {/* Terminal Output */}
        <div className="border border-green-500/30 bg-black/50 p-6 font-mono text-xs mt-8">
          <div className="text-green-400 mb-2">{'>'} project_count</div>
          <div className="text-green-300/80">
            <div>
              {selectedCategory === 'all' ? 'Total' : 'Filtered'} Projects: <span className="text-green-400">{filteredProjects.length}</span>
            </div>
            <div>Completed: <span className="text-green-400">{filteredProjects.filter(p => p.status === 'completed').length}</span></div>
            <div>In Progress: <span className="text-yellow-400">{filteredProjects.filter(p => p.status === 'in-progress').length}</span></div>
            {selectedCategory !== 'all' && (
              <div className="mt-2 text-green-500/60">
                Filter: <span className="text-green-400 capitalize">{selectedCategory.replace('-', ' ')}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Project Modal */}
      {isModalOpen && selectedProject && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity duration-250 ease-out ${
            isClosing ? 'opacity-0' : 'opacity-100'
          }`}
          onClick={handleCloseModal}
        >
          <div 
            className={`border border-green-500/50 bg-black/95 max-w-4xl w-full max-h-[90vh] flex flex-col transition-all duration-250 ${
              isClosing 
                ? 'opacity-0 scale-95 translate-y-4 ease-in' 
                : isOpening
                ? 'opacity-0 scale-95 translate-y-4'
                : 'opacity-100 scale-100 translate-y-0 ease-out'
            }`}
            onClick={(e) => e.stopPropagation()}
            style={{
              transitionTimingFunction: isClosing ? 'cubic-bezier(0.4, 0, 1, 1)' : 'cubic-bezier(0, 0, 0.2, 1)', // ease-in for close, ease-out for open
            }}
          >
            {/* Modal Header - Sticky */}
            <div className="sticky top-0 z-10 border-b border-green-500/30 p-4 flex items-center justify-between bg-black/95 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span className="text-green-400 font-mono text-sm">{'>'}</span>
                <span className="text-green-300 font-mono text-sm">{selectedProject.name}</span>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-green-400 hover:text-green-300 font-mono text-xl transition-colors"
              >
                ×
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="p-6 overflow-y-auto scrollbar-hide flex-1" style={{
              scrollbarWidth: 'none', /* Firefox */
              msOverflowStyle: 'none', /* IE and Edge */
            }}>
              {/* Project Image */}
              {selectedProject.image && (
                <div className="w-full h-64 mb-6 overflow-hidden bg-black/50">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Category and Status */}
              <div className="space-y-2 mb-4">
                {/* Category */}
                <div className="flex items-center gap-1">
                  <span className="text-green-500 font-mono text-xs">category:</span>
                  <span className="border border-blue-500/50 text-blue-400 bg-blue-500/10 font-mono text-xs px-2 py-1 capitalize">
                    {selectedProject.category.replace('-', ' ')}
                  </span>
                </div>
                {/* Status */}
                <div className="flex items-center gap-1">
                  <span className="text-green-500 font-mono text-xs">status:</span>
                  <span
                    className={`font-mono text-xs px-2 py-1 border ${
                      selectedProject.status === 'completed'
                        ? 'border-green-500/50 text-green-400 bg-green-500/10'
                        : 'border-yellow-500/50 text-yellow-400 bg-yellow-500/10'
                    }`}
                  >
                    {selectedProject.status}
                  </span>
                </div>
              </div>

              {/* Full Description */}
              <div className="mb-6">
                <h3 className="text-green-400 font-mono text-sm mb-2">{'>'} Description</h3>
                <p className="text-gray-300 font-mono text-sm leading-relaxed">
                  {selectedProject.fullDescription || selectedProject.description}
                </p>
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <h3 className="text-green-400 font-mono text-sm mb-3">{'>'} Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((tech) => (
                    <span
                      key={tech}
                      className="border border-green-500/30 bg-black/50 px-3 py-1.5 text-green-300 font-mono text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="mb-6">
                <h3 className="text-green-400 font-mono text-sm mb-3">{'>'} Links</h3>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.liveLink && (
                    <a
                      href={selectedProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 border border-green-500/50 bg-green-500/10 text-green-400 font-mono text-xs px-4 py-2 hover:bg-green-500/20 hover:border-green-500 transition-all duration-200"
                    >
                      <span>{'>'}</span>
                      <span>Live Demo</span>
                      <span className="text-green-500">→</span>
                    </a>
                  )}
                  {selectedProject.githubLink && (
                    <a
                      href={selectedProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 border border-green-500/50 bg-green-500/10 text-green-400 font-mono text-xs px-4 py-2 hover:bg-green-500/20 hover:border-green-500 transition-all duration-200"
                    >
                      <span>{'>'}</span>
                      <span>GitHub</span>
                      <span className="text-green-500">→</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Share Button */}
              <div className="pt-4 border-t border-green-500/30">
                <button
                  onClick={handleShareProject}
                  className="inline-flex items-center gap-1.5 border border-green-500/50 bg-green-500/10 text-green-400 font-mono text-sm px-4 py-2 hover:bg-green-500/20 hover:border-green-500 transition-all duration-200 w-full justify-center"
                >
                  <span>{'>'}</span>
                  <span>Share Project</span>
                  <span className="text-green-500">↗</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;

