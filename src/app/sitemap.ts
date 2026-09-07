import { MetadataRoute } from 'next';

const SITE_URL = 'https://www.mentormeright.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const publicPaths = [
    '',
    '/about',
    '/services',
    '/careers',
    '/contact',
    '/assessment',
    '/career-assessment.html',
    '/career-library',
    '/career-library/emerging-careers',
    '/study-abroad',
    '/programs',
    '/programs/entrepreneurship',
    '/skills-hub',
    '/blogs',
    '/terms',
    '/privacy',
    '/refund',
    '/roadmap',
    '/community',
    '/gamify',
    '/scholarships',
    '/exam-predictor',
    '/career-simulator',
    '/ai-learning-hub',
    '/alumni',
    '/report',
    '/counsellors',
    '/counsellors/book',
  ];

  return publicPaths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.8,
  }));
}
