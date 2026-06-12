import type { MetadataRoute } from "next";
import { site } from "@/lib/content";
import { getClient } from "@/lib/sanity";
import { categoriesQuery, postSlugsQuery } from "@/lib/sanity-queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: site.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${site.url}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${site.url}/coaching`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${site.url}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${site.url}/resources`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${site.url}/testimonials`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${site.url}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  try {
    const client = getClient(false);
    const [postSlugs, categories] = await Promise.all([
      client.fetch(postSlugsQuery),
      client.fetch(categoriesQuery),
    ]);

    const blogPages: MetadataRoute.Sitemap = postSlugs.map((slug: string) => ({
      url: `${site.url}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

    const categoryPages: MetadataRoute.Sitemap = categories.map(
      (category: any) => ({
        url: `${site.url}/blog/category/${category.slug.current}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }),
    );

    return [...staticPages, ...blogPages, ...categoryPages];
  } catch {
    return staticPages;
  }
}
