import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const paths = ['', '/diagnosis', '/about', '/consult', '/result'];
  return paths.map((path) => ({
    url: path === '' ? base : `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path === '/diagnosis' ? 0.95 : 0.7,
  }));
}
