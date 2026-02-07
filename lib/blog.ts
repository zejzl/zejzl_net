import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  author?: string;
  published?: string;
  readingTime?: string;
  tags?: string[];
  excerpt?: string;
  content?: string;
  contentHtml?: string;
  headings?: { id: string; text: string; level: number }[];
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      // Extract title from frontmatter or first H1
      let title = data.title || '';
      if (!title) {
        const match = content.match(/^#\s+(.+)$/m);
        title = match ? match[1] : slug;
      }

      // Calculate reading time
      const stats = readingTime(content);

      // Generate excerpt from first paragraph
      const excerpt = data.excerpt || content.split('\n\n').find(p => p.trim() && !p.startsWith('#'))?.substring(0, 200) + '...' || '';

      return {
        slug,
        title,
        author: data.author,
        published: data.published,
        readingTime: stats.text,
        tags: data.tags || [],
        excerpt,
      };
    })
    .sort((a, b) => {
      if (a.published && b.published) {
        return new Date(b.published).getTime() - new Date(a.published).getTime();
      }
      return 0;
    });

  return allPostsData;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Extract title
  let title = data.title || '';
  if (!title) {
    const match = content.match(/^#\s+(.+)$/m);
    title = match ? match[1] : slug;
  }

  // Calculate reading time
  const stats = readingTime(content);

  // Extract headings for table of contents
  const headings: { id: string; text: string; level: number }[] = [];
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2];
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    headings.push({ id, text, level });
  }

  // Process markdown with rehype/remark
  // Note: Removed rehypeSanitize since we control all blog content
  // Sanitization is only needed for user-generated content
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
    .use(rehypeHighlight)
    .process(content);

  const contentHtml = processedContent.toString();

  return {
    slug,
    title,
    author: data.author,
    published: data.published,
    readingTime: stats.text,
    tags: data.tags || [],
    content,
    contentHtml,
    headings,
  };
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach((post) => {
    post.tags?.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}
