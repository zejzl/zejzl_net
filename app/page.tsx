'use client';

import { useEffect, useState } from 'react';
import MatrixBackground from './components/MatrixBackground';
import Hero from './components/Hero';
import StatsDashboard from './components/StatsDashboard';
import AgentsPantheon from './components/AgentsPantheon';
import QuickStart from './components/QuickStart';
import Features from './components/Features';
import { OrganizationSchema, WebsiteSchema } from '@/components/StructuredData';

export default function Home() {
  return (
    <>
      <OrganizationSchema
        name="zejzl.net"
        url="https://zejzl-net.vercel.app"
        logo="https://pbs.twimg.com/profile_images/1771247361030811648/Bv6dnuwM_400x400.jpg"
        description="Production-ready multi-agent AI framework with 9-Agent Pantheon orchestration system"
        sameAs={[
          "https://github.com/zejzl/zejzlAI",
          "https://x.com/zejzl",
        ]}
      />
      <WebsiteSchema
        name="zejzl.net"
        url="https://zejzl-net.vercel.app"
        description="Production-ready multi-agent AI framework with 9-Agent Pantheon orchestration system"
      />
      <main className="min-h-screen bg-black text-green-500 font-mono">
        <MatrixBackground />
        <Hero />
        <StatsDashboard />
        <AgentsPantheon />
        <QuickStart />
        <Features />
      </main>
    </>
  );
}
