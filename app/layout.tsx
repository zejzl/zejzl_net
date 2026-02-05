import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "zejzl.net - Multi-Agent AI Framework",
  description: "zejzlAI - 9-Agent Pantheon orchestration system for complex AI tasks. Multi-provider support, async message bus, and self-healing magic system.",
  keywords: "AI, multi-agent, Python, async, orchestration, zejzl",
  openGraph: {
    title: "zejzl.net - Multi-Agent AI Framework",
    description: "9-Agent Pantheon system with Claude, GPT, Gemini & Grok integration",
    images: ["https://pbs.twimg.com/profile_images/1771247361030811648/Bv6dnuwM_400x400.jpg"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
