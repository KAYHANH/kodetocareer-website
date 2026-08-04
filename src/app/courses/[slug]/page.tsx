import type { Metadata } from 'next';
import CourseDetailsClient from './CourseDetailsClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const COURSES_META = [
  {
    slug: 'mern-stack-development',
    title: 'MERN Stack Development + AI Course | KodeToCareer',
    tagline: 'Master Full Stack MERN development & AI APIs with 100% live cohorts, 15+ capstones, and guaranteed placement support.',
    desc: 'Master full-stack web development and learn to build AI-powered features, chatbots, and automation workflows.'
  },
  {
    slug: 'python-programming',
    title: 'Python Programming & Automation Course | KodeToCareer',
    tagline: 'Master Python scripting, web scraping, automation pipelines, and Django REST frameworks with live cohort mentorship.',
    desc: 'Learn core python scripting, database connections, automated workflows, scraping, and integrating AI endpoints.'
  },
  {
    slug: 'data-science-machine-learning',
    title: 'Data Science & Machine Learning Course | KodeToCareer',
    tagline: 'Master Python, SQL, Machine Learning, Deep Learning, Power BI, and Generative AI through live training & capstones.',
    desc: 'Data Science and AI now sit at the center of every major industry. Companies are racing to hire people who can turn raw data into decisions.'
  },
  {
    slug: 'graphic-design-ui-ux',
    title: 'UI/UX & Graphic Product Design Course | KodeToCareer',
    tagline: 'Master Figma wireframing, interactive prototyping, design systems, Photoshop, and Illustrator in live project cohorts.',
    desc: 'Learn both graphic design and product UI/UX design. Build complete design systems, wireframes, and prototypes.'
  },
  {
    slug: 'data-analytics',
    title: 'Data Analytics & BI Training Program | KodeToCareer',
    tagline: 'Master Advanced Excel, SQL, Tableau, Power BI dashboards, and Python predictive analytics through live classes.',
    desc: 'Master data analysis pipelines, write complex SQL queries, and construct interactive dashboards in Power BI and Tableau.'
  },
  {
    slug: 'java-full-stack',
    title: 'Java Full Stack & Spring Boot Course | KodeToCareer',
    tagline: 'Master Core Java, Spring Boot 3, Hibernate ORM, microservices, PostgreSQL, and React frontend in live cohorts.',
    desc: 'Learn enterprise backend development with Java, Spring Boot, Hibernate, microservices, and frontend integration.'
  },
  {
    slug: 'cloud-devops',
    title: 'Cloud Computing & DevOps Engineering | KodeToCareer',
    tagline: 'Master AWS cloud infrastructure, Linux, Docker, Kubernetes, Jenkins CI/CD, and Terraform with live mentorship.',
    desc: 'Learn to host, scale, and automate cloud infrastructure. Master Docker, Kubernetes, Terraform, and CI/CD.'
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing & Growth Hacking | KodeToCareer',
    tagline: 'Master SEO, SEM, SMM, Google Ads, Meta Ads, growth funnels, and AI marketing tools with live campaign practice.',
    desc: 'Learn digital marketing strategies, campaign management, lead generation, and growth hacking techniques.'
  },
  {
    slug: 'videography-video-editing',
    title: 'Video Editing & Graphic Design Course | KodeToCareer',
    tagline: 'Master Premiere Pro, After Effects, storytelling, audio mixing, color grading, and visual assets in live classes.',
    desc: 'Learn professional video editing and videography using Premiere Pro, After Effects, and design tools.'
  },
  {
    slug: 'mlops-ai-systems',
    title: 'MLOps & AI Systems Engineering Course | KodeToCareer',
    tagline: 'Master Triton Inference Server, vLLM optimization, model drift auditing, MLflow pipelines, and GPU clusters.',
    desc: 'Learn to scale and monitor large language models and machine learning pipelines in production.'
  }
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const course = COURSES_META.find((c) => c.slug === resolvedParams.slug);

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
  const titleText = course.title;
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

export async function generateStaticParams() {
  return COURSES_META.map((course) => ({
    slug: course.slug,
  }));
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return <CourseDetailsClient slug={resolvedParams.slug} />;
}
