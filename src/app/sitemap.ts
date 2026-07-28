import type { MetadataRoute } from 'next'
import { getMergedPostsServer } from './blog/posts-loader'
import { LEARN_HUBS } from './learn/learn-data'
import { STUDENT_PROJECTS } from '@/data/projects-data'
import { INTERVIEW_RESOURCES, CAREER_GUIDES, SALARY_GUIDES } from '@/data/resources-data'
import { COMPARISONS_DATA } from '@/data/comparisons-data'
import { COURSES_MAP, PRICE_INTENTS, LOCATIONS, CAREER_PERSONAS, GUIDES } from '@/data/seo-intents'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kodetocareer.com'

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/courses`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/career-services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/career-services/admissions`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/career-services/placements`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/tools`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/partners`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/careers`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/cookies`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/resources`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/free-tools`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/free-tools/resume-grader`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/free-tools/mock-interview`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
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
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const blogPosts = getMergedPostsServer()
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const learnHubRoutes: MetadataRoute.Sitemap = Object.keys(LEARN_HUBS).map((slug) => ({
    url: `${baseUrl}/learn/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const projectRoutes: MetadataRoute.Sitemap = STUDENT_PROJECTS.map((proj) => ({
    url: `${baseUrl}/projects/${proj.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const interviewRoutes: MetadataRoute.Sitemap = Object.keys(INTERVIEW_RESOURCES).map((slug) => ({
    url: `${baseUrl}/resources/interviews/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const careerRoutes: MetadataRoute.Sitemap = Object.keys(CAREER_GUIDES).map((slug) => ({
    url: `${baseUrl}/resources/careers/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const salaryRoutes: MetadataRoute.Sitemap = Object.keys(SALARY_GUIDES).map((slug) => ({
    url: `${baseUrl}/resources/salaries/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const comparisonRoutes: MetadataRoute.Sitemap = Object.keys(COMPARISONS_DATA).map((slug) => ({
    url: `${baseUrl}/compare/${slug}`,
    lastModified: new Date(),
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
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })
    })

    Object.keys(LOCATIONS).forEach((locationSlug) => {
      pSeoLocationRoutes.push({
        url: `${baseUrl}/courses/${slug}/location/${locationSlug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })
    })

    Object.keys(CAREER_PERSONAS).forEach((careerSlug) => {
      pSeoCareerRoutes.push({
        url: `${baseUrl}/courses/${slug}/career/${careerSlug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })
    })

    Object.keys(GUIDES).forEach((guideSlug) => {
      pSeoGuideRoutes.push({
        url: `${baseUrl}/courses/${slug}/guide/${guideSlug}`,
        lastModified: new Date(),
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
