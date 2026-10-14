import React from 'react';
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import { ProjectDetailView } from './ProjectDetailView';

// Generate static params for all project slugs
export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.id === params.slug);
  if (!project) return { title: 'Projeto não encontrado' };

  return {
    title: `${project.title} — Hillary Heidy`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const projectIndex = projects.findIndex((p) => p.id === params.slug);
  if (projectIndex === -1) {
    notFound();
  }

  const project = projects[projectIndex];
  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <ProjectDetailView
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  );
}
