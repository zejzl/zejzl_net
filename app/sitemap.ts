import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';
import { SITE_URL, siteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  // Get all blog posts
  const posts = getAllPosts();
  
  // Generate blog post URLs
  const blogUrls = posts.map((post) => ({
    url: siteUrl(`/blog/${post.slug}`),
    lastModified: post.published ? new Date(post.published) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
  
  // Static pages
  const staticPages = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: siteUrl('/blog'),
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ];
  
  return [...staticPages, ...blogUrls];
}
