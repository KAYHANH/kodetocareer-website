import type { Metadata } from 'next';
import CourseDetailsClient from './CourseDetailsClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const COURSES_META = [
  {
    slug: 'mern-stack-development',
    title: 'MERN Stack Development + AI Integration',
    tagline: 'Become a professional Full Stack Developer & AI Engineer with our production-grade MERN Stack course.',
    desc: 'Master full-stack web development and learn to build AI-powered features, chatbots, and automation workflows.'
  },
  {
    slug: 'python-programming',
    title: 'Python Programming & Automation',
    tagline: 'Become a professional Python & Automation Engineer with our scripting, web scraping, and Django course.',
    desc: 'Learn core python scripting, database connections, automated workflows, scraping, and integrating AI endpoints.'
  },
  {
    slug: 'data-science-machine-learning',
    title: 'Data Science & Machine Learning Core',
    tagline: 'Master Python, SQL, Machine Learning, Deep Learning, Power BI, and Generative AI through live training and real-world projects.',
    desc: 'Data Science and AI now sit at the center of every major industry. Companies are racing to hire people who can turn raw data into decisions.'
  },
  {
    slug: 'graphic-design-ui-ux',
    title: 'Graphic Design + UI/UX Product Design Systems',
    tagline: 'Master Photoshop, Illustrator, Premiere Pro, Figma, wireframing, high-fidelity prototypes, and product design systems.',
    desc: 'Learn both graphic design and product UI/UX design. Build complete design systems, wireframes, and prototypes.'
  },
  {
    slug: 'data-analytics',
    title: 'Data Analytics & Business Intelligence',
    tagline: 'Master Advanced Excel, SQL, Tableau, Power BI, and Python analytics through live classes and dashboards.',
    desc: 'Master data analysis pipelines, write complex SQL queries, and construct interactive dashboards in Power BI and Tableau.'
  },
  {
    slug: 'java-full-stack',
    title: 'Java Full Stack Developer Program',
    tagline: 'Master Core Java, Spring Boot, Hibernate, microservices, databases, and React/Angular frontend hosting.',
    desc: 'Learn enterprise backend development with Java, Spring Boot, Hibernate, microservices, and frontend integration.'
  },
  {
    slug: 'cloud-devops',
    title: 'Cloud Computing & DevOps Infrastructure',
    tagline: 'Master AWS, Linux, Docker, Kubernetes, Jenkins, Terraform, CI/CD, and Cloud automation.',
    desc: 'Learn to host, scale, and automate cloud infrastructure. Master Docker, Kubernetes, Terraform, and CI/CD.'
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing with AI & Growth Hacking',
    tagline: 'Master SEO, SEM, SMM, Google Ads, Meta Ads, and AI-driven growth funnels.',
    desc: 'Learn digital marketing strategies, campaign management, lead generation, and growth hacking techniques.'
  },
  {
    slug: 'videography-video-editing',
    title: 'Graphic Designing + Videography / Video Editing',
    tagline: 'Master video editing, storytelling, audio mixing, color grading, and graphic design assets.',
    desc: 'Learn professional video editing and videography using Premiere Pro, After Effects, and design tools.'
  },
  {
    slug: 'mlops-ai-systems',
    title: 'Industry-Ready MLOps & AI Systems Engineering',
    tagline: 'Master Triton Server, vLLM inference, model drift auditing, and GPU cluster deployments.',
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

export async function generateStaticParams() {
  return COURSES_META.map((course) => ({
    slug: course.slug,
  }));
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return <CourseDetailsClient slug={resolvedParams.slug} />;
}
