import type { Metadata } from 'next';
import LearnHubClient from './LearnHubClient';
import { LEARN_HUBS } from '../learn-data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const hub = LEARN_HUBS[resolvedParams.slug];

  if (!hub) {
    return {
      title: 'Topic Not Found | KodeToCareer',
      description: 'The requested technology learning hub could not be found.'
    };
  }

  const titleText = `Learn ${hub.title} — Tutorials & Related Projects | KodeToCareer`;
  const descText = hub.tagline || hub.overview;

  return {
    title: titleText,
    description: descText,
    openGraph: {
      title: titleText,
      description: descText,
      url: `https://kodetocareer.com/learn/${hub.slug}`,
      siteName: 'KodeToCareer',
      images: [
        {
          url: `/banners/${hub.slug === 'react' ? 'mern' : hub.slug === 'sql' ? 'analytics' : hub.slug}.png`,
          width: 1200,
          height: 630,
          alt: `Learn ${hub.title}`,
        }
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: titleText,
      description: descText,
      images: [`/banners/${hub.slug === 'react' ? 'mern' : hub.slug === 'sql' ? 'analytics' : hub.slug}.png`],
    },
    alternates: {
      canonical: `https://kodetocareer.com/learn/${hub.slug}`,
    }
  };
}

export async function generateStaticParams() {
  return Object.keys(LEARN_HUBS).map((slug) => ({
    slug: slug,
  }));
}

export default async function Page({ params }: PageProps) {
  return <LearnHubClient params={params} />;
}
