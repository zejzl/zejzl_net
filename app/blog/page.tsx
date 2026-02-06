import { getAllPosts, getAllTags } from '@/lib/blog';
import Link from 'next/link';
import { Metadata } from 'next';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            zejzl.net
          </Link>
          <nav className="flex gap-6">
            <Link href="/" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/blog" className="text-blue-600 dark:text-blue-400 font-medium">
              Blog
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Blog
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl">
          Deep-dives into AI architecture, multi-agent systems, and production ML engineering. Real insights from building at scale.
        </p>
      </section>

      {/* Tags Filter */}
      {tags.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 pb-8">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Blog Posts */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-500 dark:text-slate-400 text-lg">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white dark:bg-slate-900 rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-800"
              >
                <article>
                  <h2 className="text-3xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>

                  <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
                    {post.author && <span>By {post.author}</span>}
                    {post.published && <span>{new Date(post.published).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>}
                    {post.readingTime && <span>{post.readingTime}</span>}
                  </div>

                  {post.excerpt && (
                    <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded text-xs font-medium"
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
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 py-8 text-center text-slate-600 dark:text-slate-400">
          <p>© 2026 zejzl.net. Built with Next.js, TypeScript, and Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}
