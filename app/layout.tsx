import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://zejzl-net.vercel.app'),
  title: {
    default: "zejzl.net - Production-Ready Multi-Agent AI Framework",
    template: "%s | zejzl.net"
  },
  description: "Production-ready 9-Agent Pantheon system. Multi-agent AI orchestration with Claude, GPT, Gemini & Grok. Event-driven architecture, self-healing, 42K msgs/sec performance.",
  keywords: [
    "AI framework",
    "multi-agent system",
    "AI orchestration",
    "Claude",
    "GPT-4",
    "Gemini",
    "Grok",
    "async messaging",
    "event-driven architecture",
    "Python AI",
    "production AI",
    "AI testing",
    "agent collaboration"
  ],
  authors: [{ name: "Zejzl", url: "https://x.com/zejzl" }],
  creator: "Zejzl",
  publisher: "zejzl.net",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zejzl-net.vercel.app",
    title: "zejzl.net - Production-Ready Multi-Agent AI Framework",
    description: "9-Agent Pantheon system for complex AI tasks. Multi-provider support, async message bus, self-healing magic system.",
    siteName: "zejzl.net",
    images: [
      {
        url: "https://pbs.twimg.com/profile_images/1771247361030811648/Bv6dnuwM_400x400.jpg",
        width: 400,
        height: 400,
        alt: "zejzl.net - Multi-Agent AI Framework",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "zejzl.net - Production-Ready Multi-Agent AI Framework",
    description: "9-Agent Pantheon system for complex AI tasks. Multi-provider support, async message bus, self-healing.",
    creator: "@zejzl",
    images: ["https://pbs.twimg.com/profile_images/1771247361030811648/Bv6dnuwM_400x400.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE', // TODO: Add after Google Search Console setup
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
