import type { Metadata } from 'next';
import CourseDetailsClient, { COURSES } from './CourseDetailsClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const course = COURSES.find((c) => c.slug === resolvedParams.slug);

  if (!course) {
    return {
      title: 'Course Not Found | KodeToCareer',
      description: 'The requested course could not be found.'
    };
  }

  const BANNER_MAP: Record<string, string> = {
    'mern-stack-development': '/banners/mern.png',
    'python-programming': '/banners/python.png',
    'data-science-machine-learning': '/banners/datascience.png',
    'graphic-design-ui-ux': '/banners/design.png',
    'data-analytics': '/banners/analytics.png',
    'java-full-stack': '/banners/java.png',
    'cloud-devops': '/banners/cloud.png',
    'digital-marketing': '/banners/marketing.png',
    'videography-video-editing': '/banners/video.png',
    'mlops-ai-systems': '/banners/mlops.png'
  };

  const banner = BANNER_MAP[course.slug] || '/banners/mern.png';
  const titleText = `${course.title} | KodeToCareer`;
  const descText = course.tagline || course.desc;

  return {
    title: titleText,
    description: descText,
    openGraph: {
      title: titleText,
      description: descText,
      url: `https://kodetocareer.com/courses/${course.slug}`,
      siteName: 'KodeToCareer',
      images: [
        {
          url: banner,
          width: 1200,
          height: 630,
          alt: course.title,
        }
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: titleText,
      description: descText,
      images: [banner],
    },
    alternates: {
      canonical: `https://kodetocareer.com/courses/${course.slug}`,
    }
  };
}

export default async function Page({ params }: PageProps) {
  return <CourseDetailsClient params={params} />;
}
