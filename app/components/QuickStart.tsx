'use client';

export default function QuickStart() {
  return (
    <section id="quickstart" className="relative z-10 max-w-7xl mx-auto px-6 py-16">
      <div className="bg-gray-900/50 border-2 border-green-500 rounded-lg p-12">
        <h3 className="text-4xl font-bold mb-4">🚀 Quick Start</h3>
        <p className="text-green-700 mb-8 text-lg">
          Get started with zejzlAI in minutes. Choose your installation method.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* pip install */}
          <div className="bg-black/50 border-2 border-cyan-400 rounded-lg p-8 relative">
            <div className="absolute -top-3 right-6 bg-cyan-400 text-black px-4 py-1 rounded-full text-sm font-bold">
              RECOMMENDED
            </div>
            <h4 className="text-2xl font-bold text-cyan-400 mb-4">pip install</h4>
            <p className="text-green-700 mb-6">Fastest way to get started. Installs from PyPI.</p>

            <div className="bg-black border border-green-500 rounded p-4 mb-4">
              <div className="flex justify-between items-center mb-2 pb-2 border-b border-green-700">
                <span className="text-xs text-cyan-400">bash</span>
                <button
                  onClick={() => navigator.clipboard.writeText('pip install zejzlai')}
                  className="text-xs px-3 py-1 border border-green-500 rounded hover:bg-green-500 hover:text-black transition-all"
                >
                  Copy
                </button>
              </div>
              <pre className="text-green-500"><code>pip install zejzlai</code></pre>
            </div>

            <div className="text-sm text-cyan-400">
              ⏱️ Installation time: ~30 seconds
            </div>
          </div>

          {/* git clone */}
          <div className="bg-black/50 border border-green-500 rounded-lg p-8">
            <h4 className="text-2xl font-bold text-cyan-400 mb-4">git clone</h4>
            <p className="text-green-700 mb-6">For development or to contribute to the project.</p>

            <div className="bg-black border border-green-500 rounded p-4 mb-4">
              <div className="flex justify-between items-center mb-2 pb-2 border-b border-green-700">
                <span className="text-xs text-cyan-400">bash</span>
                <button
                  onClick={() => navigator.clipboard.writeText('git clone https://github.com/zejzl/zejzlAI.git\ncd zejzlAI\npip install -e .')}
                  className="text-xs px-3 py-1 border border-green-500 rounded hover:bg-green-500 hover:text-black transition-all"
                >
                  Copy
                </button>
              </div>
              <pre className="text-green-500"><code>{`git clone https://github.com/zejzl/zejzlAI.git
cd zejzlAI
pip install -e .`}</code></pre>
            </div>

            <div className="text-sm text-cyan-400">
              ⏱️ Installation time: ~2 minutes
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-12">
          <h4 className="text-2xl font-bold text-cyan-400 mb-6 text-center">Next Steps</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black/50 border border-green-500 rounded-lg p-6">
              <div className="text-4xl font-bold text-cyan-400 mb-4">1</div>
              <strong className="text-lg text-green-500 block mb-2">Configure API Keys</strong>
              <code className="block bg-black border border-green-700 p-2 rounded text-sm mb-2">
                export OPENAI_API_KEY=&quot;your-key&quot;
              </code>
              <p className="text-sm text-green-700">Set up your AI provider credentials</p>
            </div>

            <div className="bg-black/50 border border-green-500 rounded-lg p-6">
              <div className="text-4xl font-bold text-cyan-400 mb-4">2</div>
              <strong className="text-lg text-green-500 block mb-2">Run Example</strong>
              <code className="block bg-black border border-green-700 p-2 rounded text-sm mb-2">
                python examples/simple_task.py
              </code>
              <p className="text-sm text-green-700">Try a basic agent orchestration</p>
            </div>

            <div className="bg-black/50 border border-green-500 rounded-lg p-6">
              <div className="text-4xl font-bold text-cyan-400 mb-4">3</div>
              <strong className="text-lg text-green-500 block mb-2">Explore Docs</strong>
              <p className="text-sm text-green-700 mb-2">
                <a href="https://github.com/zejzl/zejzlAI#readme" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                  Read documentation →
                </a>
              </p>
              <p className="text-sm text-green-700">Learn about agents, models, and API</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
