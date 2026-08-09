import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { STUDENT_PROJECTS } from '@/data/projects-data';
import ProjectDetailClient from './ProjectDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return STUDENT_PROJECTS.map((proj) => ({
    slug: proj.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = STUDENT_PROJECTS.find(p => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.title} | KodeToCareer Case Study`,
    description: project.tagline,
    alternates: {
      canonical: `https://kodetocareer.com/projects/${slug}`,
    }
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const project = STUDENT_PROJECTS.find(p => p.slug === slug);
  if (!project) notFound();

  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: project.title,
    description: project.overview,
    image: `https://kodetocareer.com${project.screenshot}`,
    url: `https://kodetocareer.com/projects/${project.slug}`,
    author: {
      '@type': 'Person',
      name: project.studentName,
      jobTitle: `Software Engineering Student (${project.courseName})`
    },
    publisher: {
      '@type': 'Organization',
      name: 'KodeToCareer',
      logo: {
        '@type': 'ImageObject',
        url: 'https://kodetocareer.com/main-logo.png'
      }
    },
    about: project.tags,
    proficiencyLevel: project.difficulty
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How ${project.studentName} Built: ${project.title}`,
    description: project.tagline,
    step: [
      {
        '@type': 'HowToStep',
        name: 'Challenge Identification',
        text: project.challenges
      },
      {
        '@type': 'HowToStep',
        name: 'Architectural Solution',
        text: project.solution
      },
      ...project.outcomes.map((outcome, idx) => ({
        '@type': 'HowToStep',
        name: `Implementation Step ${idx + 1}`,
        text: outcome
      }))
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <ProjectDetailClient project={project} />
    </>
  );
}
