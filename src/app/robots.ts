import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/login', '/signup'],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'OAI-SearchBot',
          'ClaudeBot',
          'Claude-User',
          'Claude-SearchBot',
          'PerplexityBot',
          'Perplexity-User',
          'Google-Extended',
          'GoogleOther',
          'Applebot-Extended',
          'Meta-ExternalAgent',
          'Facebookbot',
          'Amazonbot',
          'Bytespider',
          'CCBot',
          'YouBot',
          'Cohere-AI',
          'AI2Bot',
          'DeepCrawl',
          'anthropic-ai',
          'Deepseek-ai'
        ],
        allow: '/',
      }
    ],
    sitemap: [
      'https://kodetocareer.com/sitemap.xml',
      'https://www.kodetocareer.com/sitemap.xml'
    ],
  }
}
