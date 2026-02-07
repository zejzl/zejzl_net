import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://zejzl-net.vercel.app';
  
  // Get all blog posts
  const posts = getAllPosts();
  
  // Generate blog post URLs
  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.published ? new Date(post.published) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ];
  
  return [...staticPages, ...blogUrls];
}
