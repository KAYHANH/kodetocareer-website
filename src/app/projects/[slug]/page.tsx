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
    title: `${project.title} — Student Project Case Study | KodeToCareer`,
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

  return <ProjectDetailClient project={project} />;
}
