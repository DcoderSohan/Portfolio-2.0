import { useState, useEffect } from 'react';

const Home = () => {
  const [githubStats, setGithubStats] = useState({
    publicRepos: 0,
    followers: 0,
    following: 0,
    publicGists: 0,
    totalCommits: 0,
    loading: true,
    commitsLoading: true,
  });

  // Replace with your GitHub username
  const GITHUB_USERNAME = 'DcoderSohan'; // Change this to your GitHub username

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        if (response.ok) {
          const data = await response.json();
          setGithubStats(prev => ({
            ...prev,
            publicRepos: data.public_repos || 0,
            followers: data.followers || 0,
            following: data.following || 0,
            publicGists: data.public_gists || 0,
            loading: false,
          }));

          // Fetch commits after getting user data
          fetchTotalCommits(data.public_repos || 0);
        } else {
          setGithubStats(prev => ({ ...prev, loading: false, commitsLoading: false }));
        }
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        setGithubStats(prev => ({ ...prev, loading: false, commitsLoading: false }));
      }
    };

    const fetchTotalCommits = async (repoCount) => {
      try {
        let totalCommits = 0;
        let reposFetched = 0;
        const perPage = 100;
        const maxPages = Math.ceil(repoCount / perPage);

        // Fetch all repositories
        for (let page = 1; page <= maxPages; page++) {
          const reposResponse = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=${perPage}&page=${page}&sort=updated`
          );

          if (!reposResponse.ok) break;

          const repos = await reposResponse.json();
          if (repos.length === 0) break;

          // Fetch commits for each repository
          for (const repo of repos) {
            try {
              // Get commit count using the commits API with author filter
              const commitsResponse = await fetch(
                `https://api.github.com/repos/${repo.full_name}/commits?author=${GITHUB_USERNAME}&per_page=1`
              );

              if (commitsResponse.ok) {
                // Get total count from Link header if available
                const linkHeader = commitsResponse.headers.get('Link');
                if (linkHeader) {
                  const lastPageMatch = linkHeader.match(/page=(\d+)>; rel="last"/);
                  if (lastPageMatch) {
                    const lastPage = parseInt(lastPageMatch[1]);
                    totalCommits += lastPage;
                  } else {
                    // Check if there are any commits
                    const commitsData = await commitsResponse.json();
                    if (commitsData.length > 0) {
                      // Try to get all commits (up to 100 per page)
                      const allCommitsResponse = await fetch(
                        `https://api.github.com/repos/${repo.full_name}/commits?author=${GITHUB_USERNAME}&per_page=100`
                      );
                      if (allCommitsResponse.ok) {
                        const allCommits = await allCommitsResponse.json();
                        totalCommits += allCommits.length;
                        // Check if there are more pages
                        const allLinkHeader = allCommitsResponse.headers.get('Link');
                        if (allLinkHeader) {
                          const allLastPageMatch = allLinkHeader.match(/page=(\d+)>; rel="last"/);
                          if (allLastPageMatch) {
                            const allLastPage = parseInt(allLastPageMatch[1]);
                            totalCommits += (allLastPage - 1) * 100; // Add remaining commits
                          }
                        }
                      } else {
                        totalCommits += 1;
                      }
                    }
                  }
                } else {
                  // No pagination header, fetch commits to count
                  const commitsData = await commitsResponse.json();
                  if (commitsData.length > 0) {
                    // Try fetching more commits
                    const allCommitsResponse = await fetch(
                      `https://api.github.com/repos/${repo.full_name}/commits?author=${GITHUB_USERNAME}&per_page=100`
                    );
                    if (allCommitsResponse.ok) {
                      const allCommits = await allCommitsResponse.json();
                      totalCommits += allCommits.length;
                      // Check for more pages
                      const allLinkHeader = allCommitsResponse.headers.get('Link');
                      if (allLinkHeader) {
                        const allLastPageMatch = allLinkHeader.match(/page=(\d+)>; rel="last"/);
                        if (allLastPageMatch) {
                          const allLastPage = parseInt(allLastPageMatch[1]);
                          totalCommits += (allLastPage - 1) * 100;
                        }
                      }
                    } else {
                      totalCommits += commitsData.length;
                    }
                  }
                }
              }

              reposFetched++;
              // Update state periodically to show progress
              if (reposFetched % 5 === 0) {
                setGithubStats(prev => ({ ...prev, totalCommits }));
              }
            } catch (error) {
              console.error(`Error fetching commits for ${repo.name}:`, error);
            }
          }
        }

        setGithubStats(prev => ({
          ...prev,
          totalCommits,
          commitsLoading: false,
        }));
      } catch (error) {
        console.error('Error fetching commits:', error);
        setGithubStats(prev => ({ ...prev, commitsLoading: false }));
      }
    };

    fetchGitHubStats();
  }, []);

  return (
    <div className="min-h-screen p-8 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Terminal-like Header */}
        <div className="mb-8 border border-green-500/30 bg-black/50 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-green-400 font-mono text-sm">{'>'}</span>
            <span className="text-green-300 font-mono text-sm">welcome.sh</span>
          </div>
          <div className="text-green-500/80 font-mono text-xs">
            Initializing portfolio system...
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <div className="border border-green-500/30 bg-black/30 p-6 backdrop-blur-sm">
            <h1 className="text-4xl md:text-6xl font-mono font-bold mb-4">
              <span className="text-green-400">{'>'}</span>
              <span className="text-white ml-2">Hello, World</span>
            </h1>
            <div className="text-green-300 font-mono text-lg md:text-xl mb-2">
              <span className="text-green-500">$</span> I'm <span className="text-green-400">Sohan Sarang</span>
            </div>
            <div className="text-green-300 font-mono text-lg md:text-xl mb-6">
              <span className="text-green-500">$</span> I'm a{' '}
              <span className="text-green-400 animate-pulse">Full Stack Developer</span>
            </div>
            <p className="text-gray-300 font-mono text-sm md:text-base leading-relaxed">
              A passionate MERN stack developer dedicated to crafting scalable websites
              and innovative digital solutions. Combining technical expertise with creative
              problem-solving to build robust, performant applications that make an impact.
            </p>
          </div>

          {/* Info Section */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* What I Do */}
            <div className="border border-green-500/30 bg-black/30 p-6 backdrop-blur-sm">
              <h2 className="text-xl font-mono font-bold text-green-400 mb-4">
                {'>'} What I Do
              </h2>
              <div className="space-y-3 text-gray-300 font-mono text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">{'>'}</span>
                  <span>Design & develop scalable web applications</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">{'>'}</span>
                  <span>Build responsive and interactive user interfaces</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">{'>'}</span>
                  <span>Create robust backend APIs and databases</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">{'>'}</span>
                  <span>Optimize performance and user experience</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="border border-green-500/30 bg-black/30 p-6 backdrop-blur-sm">
              <h2 className="text-xl font-mono font-bold text-green-400 mb-4">
                {'>'} Quick Stats
              </h2>
              {githubStats.loading ? (
                <div className="space-y-4 text-gray-300 font-mono text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-green-500">Loading...</span>
                    <span className="text-green-400 animate-pulse">...</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-gray-300 font-mono text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-green-500">Public Repos:</span>
                    <span className="text-green-400 font-bold">{githubStats.publicRepos}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-500">Followers:</span>
                    <span className="text-green-400 font-bold">{githubStats.followers}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-500">Following:</span>
                    <span className="text-green-400 font-bold">{githubStats.following}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-500">Public Gists:</span>
                    <span className="text-green-400 font-bold">{githubStats.publicGists}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-500">Total Commits:</span>
                    {githubStats.commitsLoading ? (
                      <span className="text-green-400 font-bold animate-pulse">...</span>
                    ) : (
                      <span className="text-green-400 font-bold">{githubStats.totalCommits.toLocaleString()}</span>
                    )}
                  </div>
                  <div className="mt-4 pt-4 border-t border-green-500/20">
                    <a
                      href={`https://github.com/${GITHUB_USERNAME}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 hover:text-green-300 text-xs flex items-center gap-1"
                    >
                      <span>{'>'}</span>
                      <span>View GitHub Profile</span>
                      <span className="text-green-500">→</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Services/Expertise */}
          <div className="border border-green-500/30 bg-black/30 p-6 backdrop-blur-sm">
            <h2 className="text-xl font-mono font-bold text-green-400 mb-4">
              {'>'} Expertise Areas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-green-500/20 bg-black/50 p-4">
                <div className="text-green-400 font-mono text-sm mb-2">{'>'} Frontend Development</div>
                <div className="text-gray-400 font-mono text-xs">
                  React, Tailwind CSS, Material UI, Bootstrap, Responsive Design
                </div>
              </div>
              <div className="border border-green-500/20 bg-black/50 p-4">
                <div className="text-green-400 font-mono text-sm mb-2">{'>'} Backend Development</div>
                <div className="text-gray-400 font-mono text-xs">
                  Node.js, Express, REST APIs, MongoDB
                </div>
              </div>
              <div className="border border-green-500/20 bg-black/50 p-4">
                <div className="text-green-400 font-mono text-sm mb-2">{'>'} Full Stack Solutions</div>
                <div className="text-gray-400 font-mono text-xs">
                  End-to-end development, Database Design, API Integration, Deployment, GitHub
                </div>
              </div>
            </div>
          </div>

          {/* Terminal Output */}
          <div className="border border-green-500/30 bg-black/50 p-6 font-mono text-xs">
            <div className="text-green-400 mb-2">{'>'} system_info</div>
            <div className="text-green-300/80 space-y-1">
              <div><span className="text-green-500">OS:</span> Windows 11</div>
              <div><span className="text-green-500">Editor:</span> VS Code & Cursor</div>
              <div><span className="text-green-500">Status:</span> <span className="text-green-400">Available for hire</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

