import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // Example: Block a private page
    },
    sitemap: 'https://yourwebsite.com/sitemap.xml',
  };
}