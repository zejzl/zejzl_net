'use client';

import { useEffect, useState } from 'react';
import MatrixBackground from './components/MatrixBackground';
import Hero from './components/Hero';
import StatsDashboard from './components/StatsDashboard';
import AgentsPantheon from './components/AgentsPantheon';
import QuickStart from './components/QuickStart';
import Features from './components/Features';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-green-500 font-mono">
      <MatrixBackground />
      <Hero />
      <StatsDashboard />
      <AgentsPantheon />
      <QuickStart />
      <Features />
    </main>
  );
}
