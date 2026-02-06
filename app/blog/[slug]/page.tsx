import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import TableOfContents from '@/components/TableOfContents';
import { ArticleSchema, BreadcrumbSchema } from '@/components/StructuredData';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found | zejzl.net',
    };
  }

  return {
    title: `${post.title} | zejzl.net Blog`,
    description: post.excerpt || `Read ${post.title} on zejzl.net`,
    openGraph: {
      title: post.title,
      description: post.excerpt || `Read ${post.title} on zejzl.net`,
      type: 'article',
      publishedTime: post.published,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || `Read ${post.title} on zejzl.net`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const baseUrl = 'https://zejzl-net.vercel.app';
  const postUrl = `${baseUrl}/blog/${slug}`;

  return (
    <>
      <ArticleSchema
        title={post.title}
        description={post.excerpt || post.title}
        datePublished={post.published || new Date().toISOString()}
        dateModified={post.published || new Date().toISOString()}
        author={post.author || 'Zejzl'}
        url={postUrl}
        image="https://pbs.twimg.com/profile_images/1771247361030811648/Bv6dnuwM_400x400.jpg"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: baseUrl },
          { name: 'Blog', url: `${baseUrl}/blog` },
          { name: post.title, url: postUrl },
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            zejzl.net
          </Link>
          <nav className="flex gap-6">
            <Link href="/" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/blog" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              Blog
            </Link>
          </nav>
        </div>
      </header>

      {/* Article */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
          {/* Main Content */}
          <article className="max-w-3xl">
            {/* Post Header */}
            <header className="mb-12">
              <Link
                href="/blog"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6"
              >
                ← Back to blog
              </Link>

              <h1 className="text-5xl font-bold mb-6 text-slate-900 dark:text-white leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap gap-4 text-slate-500 dark:text-slate-400 mb-6">
                {post.author && <span>By {post.author}</span>}
                {post.published && (
                  <span>
                    {new Date(post.published).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                )}
                {post.readingTime && <span>{post.readingTime}</span>}
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* Post Content */}
            <div
              className="prose prose-slate dark:prose-invert max-w-none
                prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-relaxed
                prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:border prose-pre:border-slate-700
                prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/10 prose-blockquote:py-2 prose-blockquote:px-4
                prose-ul:text-slate-600 dark:prose-ul:text-slate-400
                prose-ol:text-slate-600 dark:prose-ol:text-slate-400
                prose-li:marker:text-blue-600 dark:prose-li:marker:text-blue-400
                prose-strong:text-slate-900 dark:prose-strong:text-white
                prose-hr:border-slate-200 dark:prose-hr:border-slate-800
                prose-table:border-slate-200 dark:prose-table:border-slate-800
                prose-th:bg-slate-100 dark:prose-th:bg-slate-800
                prose-td:border-slate-200 dark:prose-td:border-slate-800
              "
              dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
            />

            {/* Post Footer */}
            <footer className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
              <Link
                href="/blog"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
              >
                ← Back to all posts
              </Link>
            </footer>
          </article>

          {/* Sidebar - Table of Contents */}
          {post.headings && post.headings.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents headings={post.headings} />
              </div>
            </aside>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-slate-600 dark:text-slate-400">
          <p>© 2026 zejzl.net. Built with Next.js, TypeScript, and Tailwind CSS.</p>
        </div>
      </footer>
    </div>
    </>
  );
}
