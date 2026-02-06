import { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://realdiamondworks.com';

  // Get all blog posts
  const blogPosts = await client.fetch(`
    *[_type == "blog"] {
      "slug": slug.current,
      publishedDate,
      _updatedAt
    }
  `);

  // Get all projects
  const projects = await client.fetch(`
    *[_type == "project"] {
      "slug": slug.current,
      _updatedAt
    }
  `);

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    },
  ];

  // Blog post pages
  const blogPages = blogPosts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Project pages
  const projectPages = projects.map((project: any) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project._updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages, ...projectPages];
}
