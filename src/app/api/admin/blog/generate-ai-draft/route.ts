import { NextRequest, NextResponse } from 'next/server';
import { createPost, slugify } from '@/lib/blog/repository';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topic, keyword = '', audience = 'Tech Aspirants', category = 'Web Development', targetCourse = 'mern-stack-development', tone = 'Educational', wordCount = 800 } = body;

    if (!topic || !topic.trim()) {
      return NextResponse.json({ success: false, error: 'Topic is required.' }, { status: 400 });
    }

    const title = topic.trim();
    const excerpt = `A comprehensive guide on ${topic} tailored for ${audience}. Learn actionable strategies, key takeaways, and career insights.`;
    
    // Generate structured Markdown content
    const content = `## Introduction

As technology continues to evolve rapidly in 2026, staying ahead in **${category}** is more critical than ever. This guide explores **${topic}**, providing actionable insights and practical frameworks specifically designed for ${audience}.

## Why ${topic} Matters in 2026

1. **High Market Demand**: Industry benchmarks highlight a sharp increase in organizations seeking specialized expertise in ${keyword || category}.
2. **Accelerated Career Progression**: Mastering core skills in this domain provides a clear competitive edge during interviews and technical evaluations.
3. **Practical Implementation**: Real-world project experience outweighs theoretical knowledge in today's hiring landscape.

## Key Learning & Implementation Roadmap

### 1. Master Core Fundamentals
Start by building a rock-solid foundation in ${category}. Dedicate time to understanding underlying architectures, design principles, and production best practices.

### 2. Build Industry-Grade Projects
Deploy live, production-ready projects to demonstrate competence. Ensure your portfolio features real-world APIs, clean documentation, and scalable code structures.

### 3. Prepare for Technical Evaluations
Practice system design, problem-solving, and scenario-based interview questions to showcase both technical depth and clear communication.

## Summary & Next Steps

Navigating ${topic} requires consistency, structured guidance, and hands-on execution. Whether you are starting your career or transitioning into tech, taking proactive steps today will set you apart.`;

    const faqs = [
      {
        question: `Why is ${topic} important for freshers in 2026?`,
        answer: `It provides industry-relevant skills and practical project experience aligned with current hiring requirements.`
      },
      {
        question: `How can KodeToCareer help me master ${category}?`,
        answer: `KodeToCareer offers 100% live interactive cohorts, 1-on-1 mentorship, live project experience, and dedicated placement support.`
      }
    ];

    // Create post strictly as STATUS = DRAFT
    const draftPost = createPost({
      title,
      slug: slugify(title),
      excerpt,
      content,
      category,
      tags: [category, 'Career', 'Guide', keyword].filter(Boolean),
      authorId: 'md-arbaaz',
      status: 'draft', // STRICTLY DRAFT
      relatedCourseSlug: targetCourse,
      seoTitle: `${title} | KodeToCareer Guide`,
      seoDescription: excerpt,
      faqs
    });

    return NextResponse.json({
      success: true,
      post: draftPost
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
