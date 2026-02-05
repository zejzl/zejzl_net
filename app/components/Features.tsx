'use client';

const features = [
  {
    icon: '🔄',
    title: 'Async Message Bus',
    desc: 'High-performance async communication between agents with 408K+ msg/sec throughput'
  },
  {
    icon: '🎯',
    title: 'Multi-Provider Support',
    desc: 'Integrates Claude, GPT-4, Gemini, Grok, and more with automatic fallbacks'
  },
  {
    icon: '🧩',
    title: 'Task Decomposition',
    desc: 'Automatically breaks complex tasks into manageable subtasks'
  },
  {
    icon: '🔍',
    title: 'Self-Healing Magic',
    desc: 'Automatic error recovery and task retry with exponential backoff'
  },
  {
    icon: '📊',
    title: 'Real-Time Monitoring',
    desc: 'Live performance metrics, agent health checks, and system diagnostics'
  },
  {
    icon: '🎓',
    title: 'Continuous Learning',
    desc: 'Agents learn from interactions, improving performance over time'
  },
];

export default function Features() {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 py-16">
      <div className="bg-gray-900/50 border-2 border-green-500 rounded-lg p-12">
        <h3 className="text-4xl font-bold mb-12">✨ Key Features</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="text-4xl">{feature.icon}</div>
              <div>
                <h4 className="text-xl font-bold text-cyan-400 mb-2">{feature.title}</h4>
                <p className="text-green-700 text-sm">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="mt-16 pt-12 border-t border-green-500">
          <h4 className="text-2xl font-bold text-cyan-400 mb-6 text-center">Built With</h4>
          <div className="flex flex-wrap justify-center gap-3">
            {['Python 3.12+', 'AsyncIO', 'FastAPI', 'Pydantic', 'Redis', 'PostgreSQL', 'Docker'].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-black/50 border border-green-500 rounded-full text-sm hover:bg-green-500 hover:text-black transition-all"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-12 border-t border-green-500 text-center">
          <p className="text-green-700 mb-4">
            Made with 💚 by <a href="https://x.com/zejzl" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">@zejzl</a>
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="https://github.com/zejzl/zejzlAI" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-cyan-400 transition-colors">
              GitHub
            </a>
            <a href="https://github.com/zejzl/zejzlAI/issues" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-cyan-400 transition-colors">
              Issues
            </a>
            <a href="https://github.com/zejzl/zejzlAI#license" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-cyan-400 transition-colors">
              License
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
