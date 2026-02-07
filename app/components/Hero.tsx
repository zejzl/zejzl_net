'use client';

export default function Hero() {
  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b-2 border-green-500">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <img
            src="https://pbs.twimg.com/profile_images/1771247361030811648/Bv6dnuwM_400x400.jpg"
            alt="zejzl logo"
            className="w-12 h-12 rounded-full border-2 border-green-500 animate-pulse"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold">zejzl.net</h1>
            <p className="text-sm text-green-700">Multi-Agent AI Orchestration Framework</p>
          </div>
          <nav className="hidden md:flex gap-4">
            <a
              href="/blog"
              className="px-4 py-2 border border-green-500 rounded hover:bg-green-500 hover:text-black transition-all"
            >
              Blog
            </a>
            <a
              href="https://github.com/zejzl/zejzlAI"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-green-500 rounded hover:bg-green-500 hover:text-black transition-all"
            >
              GitHub
            </a>
            <a
              href="https://x.com/zejzl"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-green-500 rounded hover:bg-green-500 hover:text-black transition-all"
            >
              X / Twitter
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-16">
        <div className="bg-gray-900/50 border-2 border-green-500 rounded-lg p-12 shadow-2xl shadow-green-500/30 animate-pulse-slow">
          <h2 className="text-5xl font-bold mb-4 animate-flicker">zejzlAI Framework</h2>
          <p className="text-2xl text-green-700 mb-6">9-Agent Pantheon Orchestration System</p>
          <p className="text-lg mb-8 max-w-3xl">
            An async message bus AI framework that orchestrates multiple AI models through a specialized 9-agent system
            for complex task decomposition, execution, validation, and continuous learning.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-black/50 border border-green-500 p-4 rounded text-center hover:scale-105 transition-transform">
              <div className="text-3xl font-bold text-cyan-400">9</div>
              <div className="text-sm text-green-700">Specialized Agents</div>
            </div>
            <div className="bg-black/50 border border-green-500 p-4 rounded text-center hover:scale-105 transition-transform">
              <div className="text-3xl font-bold text-cyan-400">7</div>
              <div className="text-sm text-green-700">AI Providers</div>
            </div>
            <div className="bg-black/50 border border-green-500 p-4 rounded text-center hover:scale-105 transition-transform">
              <div className="text-3xl font-bold text-cyan-400">408K+</div>
              <div className="text-sm text-green-700">Msg/sec Throughput</div>
            </div>
            <div className="bg-black/50 border border-green-500 p-4 rounded text-center hover:scale-105 transition-transform">
              <div className="text-3xl font-bold text-cyan-400">11/11</div>
              <div className="text-sm text-green-700">Tests Passing</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#quickstart"
              className="px-6 py-3 bg-green-500 text-black font-bold rounded hover:bg-green-400 hover:shadow-lg hover:shadow-green-500/50 transition-all"
            >
              🚀 Quick Start
            </a>
            <a
              href="#stats"
              className="px-6 py-3 border-2 border-green-500 rounded hover:bg-green-500 hover:text-black transition-all"
            >
              📊 Live Stats
            </a>
            <a
              href="https://github.com/zejzl/zejzlAI"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border-2 border-green-500 rounded hover:bg-green-500 hover:text-black transition-all"
            >
              ⭐ GitHub
            </a>
            <a
              href="#agents"
              className="px-6 py-3 border-2 border-green-500 rounded hover:bg-green-500 hover:text-black transition-all"
            >
              🤖 Agents
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
