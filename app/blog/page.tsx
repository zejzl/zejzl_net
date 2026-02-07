import { getAllPosts, getAllTags } from '@/lib/blog';
import Link from 'next/link';
import { Metadata } from 'next';
import MatrixBackground from '@/app/components/MatrixBackground';

export const metadata: Metadata = {
  title: 'Technical Blog - AI Architecture & Multi-Agent Systems',
  description: 'Deep-dives into AI architecture, multi-agent orchestration, testing strategies, and production ML engineering. Real insights from building at scale.',
  keywords: [
    'AI blog',
    'multi-agent systems',
    'AI architecture',
    'production ML',
    'AI testing',
    'agent orchestration',
    'technical writing'
  ],
  openGraph: {
    title: 'Technical Blog - AI Architecture & Multi-Agent Systems | zejzl.net',
    description: 'Deep-dives into AI architecture, multi-agent systems, and production ML engineering.',
    type: 'website',
    url: 'https://zejzl-net.vercel.app/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Technical Blog | zejzl.net',
    description: 'Deep-dives into AI architecture, multi-agent systems, and production ML engineering.',
    creator: '@zejzl',
  },
  alternates: {
    canonical: 'https://zejzl-net.vercel.app/blog',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono">
      <MatrixBackground />
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b-2 border-green-500">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-green-500 hover:text-green-400 transition-colors">
            zejzl.net
          </Link>
          <nav className="flex gap-6">
            <Link href="/" className="text-green-400 hover:text-green-300 transition-colors">
              Home
            </Link>
            <Link href="/blog" className="text-green-500 font-bold">
              Blog
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 pt-32 pb-16">
        <div className="bg-gray-900/50 border-2 border-green-500 rounded-lg p-8">
          <h1 className="text-5xl font-bold mb-4 text-green-500">
            Blog
          </h1>
          <p className="text-xl text-green-400 max-w-2xl">
            Deep-dives into AI architecture, multi-agent systems, and production ML engineering. Real insights from building at scale.
          </p>
        </div>
      </section>

      {/* Tags Filter */}
      {tags.length > 0 && (
        <section className="relative z-10 max-w-5xl mx-auto px-4 pb-8">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-green-900/30 border border-green-500 text-green-400 rounded text-sm hover:bg-green-900/50 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Blog Posts */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 pb-20">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-green-700 text-lg">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-gray-900/50 border-2 border-green-500 rounded-xl p-8 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300"
              >
                <article>
                  <h2 className="text-3xl font-bold mb-3 text-green-500 group-hover:text-green-400 transition-colors">
                    {post.title}
                  </h2>

                  <div className="flex flex-wrap gap-4 text-sm text-green-700 mb-4">
                    {post.author && <span>By {post.author}</span>}
                    {post.published && <span>{new Date(post.published).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>}
                    {post.readingTime && <span>{post.readingTime}</span>}
                  </div>

                  {post.excerpt && (
                    <p className="text-green-400 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-green-900/30 border border-green-700 text-green-400 rounded text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t-2 border-green-500 bg-black/90">
        <div className="max-w-5xl mx-auto px-4 py-8 text-center text-green-700">
          <p>© 2026 zejzl.net. Built with Next.js, TypeScript, and Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}
