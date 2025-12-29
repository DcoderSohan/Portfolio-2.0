const About = () => {
  const educations = [
    {
      year: '2024',
      degree: 'Bachelor\'s Degree in Information Technology',
      institution: 'University of Mumbai',
      description: 'Completed Bachelor\'s degree with focus on Information Technology and software engineering. Gained strong foundation in programming and software development methodologies. Applied theoretical knowledge through various projects and coursework.',
    },
    {
      year: '2021',
      degree: 'Senior Secondary School',
      institution: 'Br Nath Pai Vidyalaya & Jr College, Harche, Ratnagiri',
      description: 'Completed Higher Secondary Certificate (HSC) with focus on science stream. Developed strong analytical and problem-solving skills. Participated in various academic activities and maintained consistent academic performance.',
    },
    {
      year: '2019',
      degree: 'Secondary School',
      institution: 'Vishweshwar Vidya Mandir, Gavade Ambere, Ratnagiri',
      description: 'Completed Secondary School Certificate (SSC) with excellent academic performance. Built strong foundation in mathematics, science, and computer fundamentals. Developed interest in technology and programming during this period.',
    },
  ];

  const experiences = [
    {
      year: '2024',
      title: 'Web Developer',
      company: 'Prodigy Infotech',
      timePeriod: 'June 2024 - July 2024',
      description: '1 month internship. Learning and implementing modern web technologies.',
    },
    {
      year: '2024',
      title: 'Freelance Developer',
      company: 'Self-Employed',
      timePeriod: 'Present',
      description: 'Currently providing web development services to clients, building custom solutions and applications.',
    },
  ];

  return (
    <div className="min-h-screen p-8 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 border border-green-500/30 bg-black/50 p-4">
          <div className="flex items-center gap-2">
            <span className="text-green-400 font-mono text-sm">{'>'}</span>
            <span className="text-green-300 font-mono text-sm">about.txt</span>
          </div>
        </div>

        <div className="space-y-8">
          {/* About Section */}
          <div className="border border-green-500/30 bg-black/30 p-6 backdrop-blur-sm">
            <h2 className="text-2xl md:text-3xl font-mono font-bold mb-4 text-green-400">
              {'>'} About Me
            </h2>
            <p className="text-gray-300 font-mono text-sm md:text-base leading-relaxed mb-4">
              I'm a passionate developer who loves solving complex problems and
              building innovative solutions. With expertise in both frontend and
              backend technologies, I create full-stack applications that are both
              functional and beautiful.
            </p>
            <p className="text-gray-300 font-mono text-sm md:text-base leading-relaxed">
              When I'm not coding, you can find me exploring new technologies,
              contributing to open-source projects, and learning new things.
            </p>
          </div>

          {/* Education */}
          <div className="border border-green-500/30 bg-black/30 p-6 backdrop-blur-sm">
            <h2 className="text-2xl md:text-3xl font-mono font-bold mb-6 text-green-400">
              {'>'} Education
            </h2>
            <div className="space-y-6">
              {educations.map((edu, index) => (
                <div key={index} className="border-l-2 border-green-500/50 pl-4">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-green-400 font-mono text-sm">{edu.year}</span>
                    <span className="text-white font-mono font-semibold">{edu.degree}</span>
                  </div>
                  <div className="text-green-300/80 font-mono text-sm mb-1">
                    @ {edu.institution}
                  </div>
                  <div className="text-gray-400 font-mono text-xs">
                    {edu.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Timeline */}
          <div className="border border-green-500/30 bg-black/30 p-6 backdrop-blur-sm">
            <h2 className="text-2xl md:text-3xl font-mono font-bold mb-6 text-green-400">
              {'>'} Experience
            </h2>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div key={index} className="border-l-2 border-green-500/50 pl-4">
                  <div className="flex items-center gap-4 mb-2 flex-wrap">
                    <span className="text-green-400 font-mono text-sm">{exp.year}</span>
                    <span className="text-white font-mono font-semibold">{exp.title}</span>
                    {exp.timePeriod && (
                      <span className="border border-green-500/50 bg-green-500/10 px-2 py-1 text-green-300 font-mono text-xs">
                        {exp.timePeriod}
                      </span>
                    )}
                  </div>
                  <div className="text-green-300/80 font-mono text-sm mb-1">
                    @ {exp.company}
                  </div>
                  <div className="text-gray-400 font-mono text-xs">
                    {exp.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="border border-green-500/30 bg-black/30 p-6 backdrop-blur-sm">
            <h2 className="text-2xl md:text-3xl font-mono font-bold mb-4 text-green-400">
              {'>'} Skills & Technologies
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                'React.js', 'Node.js', 'Express', 'MongoDB',
                'GitHub','REST APIs','Tailwind CSS','Bootstrap','Responsive Design','Cursor','HTML & CSS', 'JavaScript'
              ].map((skill) => (
                <div
                  key={skill}
                  className="border border-green-500/20 bg-black/50 p-3 text-center hover:border-green-500/50 transition-all"
                >
                  <span className="text-green-300 font-mono text-sm">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

