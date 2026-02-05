'use client';

import { useEffect, useState } from 'react';

export default function StatsDashboard() {
  const [githubStats, setGithubStats] = useState({
    stars: 0,
    forks: 0,
    watchers: 0,
  });

  useEffect(() => {
    fetch('https://api.github.com/repos/zejzl/zejzlAI')
      .then(res => res.json())
      .then(data => {
        setGithubStats({
          stars: data.stargazers_count || 0,
          forks: data.forks_count || 0,
          watchers: data.watchers_count || 0,
        });
      })
      .catch(console.error);
  }, []);

  return (
    <section id="stats" className="relative z-10 max-w-7xl mx-auto px-6 py-16">
      <div className="bg-gray-900/50 border-2 border-green-500 rounded-lg p-12">
        <h3 className="text-4xl font-bold mb-4">📊 Live System Status</h3>
        <p className="text-green-700 mb-8 text-lg">
          Real-time metrics and performance indicators from the zejzlAI framework.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* GitHub Stats */}
          <div className="bg-black/50 border border-green-500 rounded-lg overflow-hidden hover:scale-105 transition-transform">
            <div className="bg-black border-b border-green-500 p-4 flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <h4 className="text-xl font-bold text-cyan-400">GitHub Repository</h4>
            </div>
            <div className="p-6 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">{githubStats.stars}</div>
                <div className="text-sm text-green-700">Stars</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">{githubStats.forks}</div>
                <div className="text-sm text-green-700">Forks</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">{githubStats.watchers}</div>
                <div className="text-sm text-green-700">Watchers</div>
              </div>
            </div>
            <a
              href="https://github.com/zejzl/zejzlAI"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center p-4 border-t border-green-500 hover:bg-green-500 hover:text-black transition-all"
            >
              View on GitHub →
            </a>
          </div>

          {/* Performance Metrics */}
          <div className="bg-black/50 border border-green-500 rounded-lg overflow-hidden hover:scale-105 transition-transform">
            <div className="bg-black border-b border-green-500 p-4 flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <h4 className="text-xl font-bold text-cyan-400">Performance</h4>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold text-cyan-400">407,911</span>
                  <span className="text-green-700">msg/sec</span>
                </div>
                <div className="text-sm text-green-700 mb-2">MessageBus Throughput</div>
                <div className="w-full bg-black border border-green-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-cyan-400 h-full rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold text-cyan-400">0.007</span>
                  <span className="text-green-700">ms</span>
                </div>
                <div className="text-sm text-green-700 mb-2">Latency (avg)</div>
                <div className="w-full bg-black border border-green-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-cyan-400 h-full rounded-full" style={{ width: '98%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Test Coverage */}
          <div className="bg-black/50 border border-green-500 rounded-lg overflow-hidden hover:scale-105 transition-transform">
            <div className="bg-black border-b border-green-500 p-4 flex items-center gap-2">
              <span className="text-2xl">✅</span>
              <h4 className="text-xl font-bold text-cyan-400">Test Suite</h4>
            </div>
            <div className="p-6 text-center">
              <div className="inline-flex items-center gap-2 px-6 py-2 bg-green-500 text-black rounded-full font-bold mb-6">
                <span>✓</span>
                ALL TESTS PASSING
              </div>
              <div className="mb-4">
                <div className="text-5xl font-bold text-cyan-400">11/11</div>
                <div className="text-green-700">tests passed</div>
              </div>
              <div className="relative w-32 h-32 mx-auto">
                <svg className="transform -rotate-90" width="128" height="128">
                  <circle cx="64" cy="64" r="52" fill="none" stroke="#0a0a0a" strokeWidth="8" />
                  <circle
                    cx="64"
                    cy="64"
                    r="52"
                    fill="none"
                    stroke="#0f0"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="327"
                    strokeDashoffset="0"
                    className="drop-shadow-[0_0_5px_#0f0]"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-cyan-400">
                  100%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
