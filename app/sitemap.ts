import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { siteUrl } from '@/lib/shared';

export default function sitemap(): MetadataRoute.Sitemap {
  const home: MetadataRoute.Sitemap[number] = {
    url: siteUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  };

  const docsEntries = source.getPages().map((page) => ({
    url: `${siteUrl}${page.url}`,
    lastModified:
      page.data.updated && !Number.isNaN(Date.parse(page.data.updated))
        ? new Date(`${page.data.updated}T12:00:00.000Z`)
        : new Date(),
    changeFrequency: 'weekly' as const,
    priority: page.url === '/docs' ? 1 : 0.8,
  }));

  return [home, ...docsEntries];
}
