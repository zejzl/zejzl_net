import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import TableOfContents from '@/components/TableOfContents';
import { ArticleSchema, BreadcrumbSchema } from '@/components/StructuredData';
import MatrixBackground from '@/app/components/MatrixBackground';

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
      <div className="min-h-screen bg-black text-green-500 font-mono">
      <MatrixBackground />
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b-2 border-green-500">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-green-500 hover:text-green-400 transition-colors">
            zejzl.net
          </Link>
          <nav className="flex gap-6">
            <Link href="/" className="text-green-400 hover:text-green-300 transition-colors">
              Home
            </Link>
            <Link href="/blog" className="text-green-400 hover:text-green-300 transition-colors">
              Blog
            </Link>
          </nav>
        </div>
      </header>

      {/* Article */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-32 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
          {/* Main Content */}
          <article className="max-w-3xl">
            {/* Post Header */}
            <header className="mb-12 bg-gray-900/50 border-2 border-green-500 rounded-lg p-8">
              <Link
                href="/blog"
                className="inline-flex items-center text-green-400 hover:text-green-300 mb-6"
              >
                ← Back to blog
              </Link>

              <h1 className="text-5xl font-bold mb-6 text-green-500 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap gap-4 text-green-700 mb-6">
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
                      className="px-3 py-1 bg-green-900/30 border border-green-500 text-green-400 rounded text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* Post Content */}
            <div
              className="prose prose-invert max-w-none bg-gray-900/30 border border-green-500 rounded-lg p-8
                prose-headings:font-bold prose-headings:text-green-500
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-green-700 prose-h2:pb-2
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-green-400
                prose-p:text-green-300 prose-p:leading-relaxed
                prose-a:text-green-400 prose-a:no-underline hover:prose-a:underline hover:prose-a:text-green-300
                prose-code:text-green-400 prose-code:bg-black/50 prose-code:border prose-code:border-green-700 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-black prose-pre:text-green-400 prose-pre:border prose-pre:border-green-700 prose-pre:shadow-lg prose-pre:shadow-green-500/20
                prose-blockquote:border-l-4 prose-blockquote:border-green-500 prose-blockquote:bg-green-900/10 prose-blockquote:text-green-400 prose-blockquote:py-2 prose-blockquote:px-4
                prose-ul:text-green-300
                prose-ol:text-green-300
                prose-li:marker:text-green-500
                prose-strong:text-green-400 prose-strong:font-bold
                prose-hr:border-green-700
                prose-table:border-green-700
                prose-th:bg-green-900/20 prose-th:text-green-400 prose-th:border-green-700
                prose-td:border-green-700 prose-td:text-green-300
              "
              dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
            />

            {/* Post Footer */}
            <footer className="mt-16 pt-8 border-t border-green-700">
              <Link
                href="/blog"
                className="inline-flex items-center text-green-400 hover:text-green-300"
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
      <footer className="relative z-10 border-t-2 border-green-500 bg-black/90">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-green-700">
          <p>© 2026 zejzl.net. Built with Next.js, TypeScript, and Tailwind CSS.</p>
        </div>
      </footer>
    </div>
    </>
  );
}
