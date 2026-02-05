'use client';

const agents = [
  { icon: '🧠', name: 'Pantheon', role: 'Master Orchestrator', desc: 'Coordinates all agents, manages message bus, handles complex task routing' },
  { icon: '🎯', name: 'Orchestrator', role: 'Task Decomposer', desc: 'Breaks down complex tasks into actionable sub-tasks' },
  { icon: '💭', name: 'Reasoner', role: 'Logic Engine', desc: 'Analyzes problems, generates solutions, handles abstract reasoning' },
  { icon: '📝', name: 'Memory', role: 'Context Manager', desc: 'Maintains conversation history, retrieves relevant context' },
  { icon: '🔍', name: 'Analyzer', role: 'Data Analyst', desc: 'Processes data, identifies patterns, generates insights' },
  { icon: '✨', name: 'Improver', role: 'Quality Enhancer', desc: 'Refines outputs, optimizes results, suggests improvements' },
  { icon: '✅', name: 'Validator', role: 'Quality Assurance', desc: 'Verifies accuracy, checks constraints, ensures quality' },
  { icon: '📚', name: 'Learner', role: 'Knowledge Builder', desc: 'Extracts lessons, updates knowledge base, enables continuous improvement' },
  { icon: '⚡', name: 'Executor', role: 'Action Handler', desc: 'Executes tasks, interfaces with external systems, delivers results' },
];

export default function AgentsPantheon() {
  return (
    <section id="agents" className="relative z-10 max-w-7xl mx-auto px-6 py-16">
      <div className="bg-gray-900/50 border-2 border-green-500 rounded-lg p-12">
        <h3 className="text-4xl font-bold mb-4">🤖 9-Agent Pantheon</h3>
        <p className="text-green-700 mb-8 text-lg">
          Each agent is specialized for a specific aspect of AI task orchestration, working together through an async message bus.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent, idx) => (
            <div
              key={idx}
              className="bg-black/50 border border-green-500 rounded-lg p-6 hover:scale-105 hover:shadow-lg hover:shadow-green-500/30 transition-all relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="text-4xl mb-3">{agent.icon}</div>
                <h4 className="text-2xl font-bold text-cyan-400 mb-2">{agent.name}</h4>
                <div className="text-sm text-green-700 italic mb-3">{agent.role}</div>
                <p className="text-sm">{agent.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
