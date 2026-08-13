import type { MetadataRoute } from 'next'
import { getPosts } from '@/lib/blog/repository'
import { LEARN_HUBS } from './learn/learn-data'
import { STUDENT_PROJECTS } from '@/data/projects-data'
import { INTERVIEW_RESOURCES, CAREER_GUIDES, SALARY_GUIDES } from '@/data/resources-data'
import { COMPARISONS_DATA } from '@/data/comparisons-data'
import { COURSES_MAP, PRICE_INTENTS, LOCATIONS, CAREER_PERSONAS, GUIDES } from '@/data/seo-intents'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kodetocareer.com'
  const STABLE_STATIC_DATE = new Date('2026-08-01T00:00:00.000Z');

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: STABLE_STATIC_DATE, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: STABLE_STATIC_DATE, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/courses`, lastModified: STABLE_STATIC_DATE, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: STABLE_STATIC_DATE, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/career-services`, lastModified: STABLE_STATIC_DATE, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/career-services/admissions`, lastModified: STABLE_STATIC_DATE, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/career-services/placements`, lastModified: STABLE_STATIC_DATE, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: STABLE_STATIC_DATE, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/tools`, lastModified: STABLE_STATIC_DATE, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/partners`, lastModified: STABLE_STATIC_DATE, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/careers`, lastModified: STABLE_STATIC_DATE, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: STABLE_STATIC_DATE, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: STABLE_STATIC_DATE, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/cookies`, lastModified: STABLE_STATIC_DATE, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/projects`, lastModified: STABLE_STATIC_DATE, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/resources`, lastModified: STABLE_STATIC_DATE, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/courses-in-india`, lastModified: STABLE_STATIC_DATE, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/online-courses`, lastModified: STABLE_STATIC_DATE, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/free-tools`, lastModified: STABLE_STATIC_DATE, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/free-tools/resume-grader`, lastModified: STABLE_STATIC_DATE, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/free-tools/mock-interview`, lastModified: STABLE_STATIC_DATE, changeFrequency: 'weekly', priority: 0.8 },
  ]

  const courseSlugs = [
    'mern-stack-development',
    'python-programming',
    'data-science-machine-learning',
    'graphic-design-ui-ux',
    'data-analytics',
    'java-full-stack',
    'cloud-devops',
    'digital-marketing',
    'videography-video-editing',
    'mlops-ai-systems',
  ]

  const courseRoutes: MetadataRoute.Sitemap = courseSlugs.map((slug) => ({
    url: `${baseUrl}/courses/${slug}`,
    lastModified: STABLE_STATIC_DATE,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const { posts: publishedBlogPosts } = getPosts({ status: 'published', limit: 500 })
  const blogRoutes: MetadataRoute.Sitemap = publishedBlogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.publishedAt || '2026-08-01'),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const learnHubRoutes: MetadataRoute.Sitemap = Object.keys(LEARN_HUBS).map((slug) => ({
    url: `${baseUrl}/learn/${slug}`,
    lastModified: STABLE_STATIC_DATE,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const projectRoutes: MetadataRoute.Sitemap = STUDENT_PROJECTS.map((proj) => ({
    url: `${baseUrl}/projects/${proj.slug}`,
    lastModified: STABLE_STATIC_DATE,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const interviewRoutes: MetadataRoute.Sitemap = Object.keys(INTERVIEW_RESOURCES).map((slug) => ({
    url: `${baseUrl}/resources/interviews/${slug}`,
    lastModified: STABLE_STATIC_DATE,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const careerRoutes: MetadataRoute.Sitemap = Object.keys(CAREER_GUIDES).map((slug) => ({
    url: `${baseUrl}/resources/careers/${slug}`,
    lastModified: STABLE_STATIC_DATE,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const salaryRoutes: MetadataRoute.Sitemap = Object.keys(SALARY_GUIDES).map((slug) => ({
    url: `${baseUrl}/resources/salaries/${slug}`,
    lastModified: STABLE_STATIC_DATE,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const comparisonRoutes: MetadataRoute.Sitemap = Object.keys(COMPARISONS_DATA).map((slug) => ({
    url: `${baseUrl}/compare/${slug}`,
    lastModified: STABLE_STATIC_DATE,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const pSeoPriceRoutes: MetadataRoute.Sitemap = []
  const pSeoLocationRoutes: MetadataRoute.Sitemap = []
  const pSeoCareerRoutes: MetadataRoute.Sitemap = []
  const pSeoGuideRoutes: MetadataRoute.Sitemap = []

  Object.keys(COURSES_MAP).forEach((slug) => {
    Object.keys(PRICE_INTENTS).forEach((priceSlug) => {
      pSeoPriceRoutes.push({
        url: `${baseUrl}/courses/${slug}/price/${priceSlug}`,
        lastModified: STABLE_STATIC_DATE,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })
    })

    Object.keys(LOCATIONS).forEach((locationSlug) => {
      pSeoLocationRoutes.push({
        url: `${baseUrl}/courses/${slug}/location/${locationSlug}`,
        lastModified: STABLE_STATIC_DATE,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })
    })

    Object.keys(CAREER_PERSONAS).forEach((careerSlug) => {
      pSeoCareerRoutes.push({
        url: `${baseUrl}/courses/${slug}/career/${careerSlug}`,
        lastModified: STABLE_STATIC_DATE,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })
    })

    Object.keys(GUIDES).forEach((guideSlug) => {
      pSeoGuideRoutes.push({
        url: `${baseUrl}/courses/${slug}/guide/${guideSlug}`,
        lastModified: STABLE_STATIC_DATE,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })
    })
  })

  return [
    ...staticRoutes,
    ...courseRoutes,
    ...blogRoutes,
    ...learnHubRoutes,
    ...projectRoutes,
    ...interviewRoutes,
    ...careerRoutes,
    ...salaryRoutes,
    ...comparisonRoutes,
    ...pSeoPriceRoutes,
    ...pSeoLocationRoutes,
    ...pSeoCareerRoutes,
    ...pSeoGuideRoutes
  ]
}
