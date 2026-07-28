import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { resumeText, targetRole } = body as { resumeText: string; targetRole: string };

    if (!resumeText || resumeText.trim().length < 20) {
      return NextResponse.json(
        { error: 'Please provide at least 20 characters of resume content to evaluate.' },
        { status: 400 }
      );
    }

    const text = resumeText.toLowerCase();

    // Key Tech Triggers based on target role
    const roleKeywords: Record<string, string[]> = {
      'fullstack-mern': ['react', 'node', 'express', 'mongodb', 'javascript', 'typescript', 'next.js', 'git', 'rest api', 'tailwind'],
      'data-science': ['python', 'pandas', 'numpy', 'sql', 'scikit-learn', 'machine learning', 'tableau', 'powerbi', 'pytorch', 'tensorflow'],
      'java-enterprise': ['java', 'spring boot', 'hibernate', 'microservices', 'sql', 'maven', 'docker', 'junit', 'rest', 'git'],
      'cloud-devops': ['aws', 'docker', 'kubernetes', 'linux', 'bash', 'ci/cd', 'terraform', 'git', 'jenkins', 'python'],
      'ui-ux-design': ['figma', 'wireframing', 'prototyping', 'user research', 'design system', 'adobe xd', 'usability testing', 'design thinking'],
    };

    const targetKey = targetRole || 'fullstack-mern';
    const expectedKeywords = roleKeywords[targetKey] || roleKeywords['fullstack-mern'];

    const matchedKeywords = expectedKeywords.filter((kw) => text.includes(kw));
    const missingKeywords = expectedKeywords.filter((kw) => !text.includes(kw));

    // Calculating score dynamically
    const keywordMatchPercent = (matchedKeywords.length / expectedKeywords.length) * 50;
    const hasProjects = text.includes('project') || text.includes('built') || text.includes('developed') ? 20 : 5;
    const hasEducation = text.includes('b.tech') || text.includes('bca') || text.includes('mca') || text.includes('degree') || text.includes('college') ? 15 : 5;
    const hasExperience = text.includes('internship') || text.includes('experience') || text.includes('worked') ? 15 : 5;

    const totalScore = Math.min(98, Math.max(35, Math.round(keywordMatchPercent + hasProjects + hasEducation + hasExperience)));

    const strengths: string[] = [];
    const improvements: string[] = [];

    if (matchedKeywords.length > 0) {
      strengths.push(`Good inclusion of core tech stack keywords: ${matchedKeywords.join(', ')}.`);
    }
    if (hasProjects > 10) {
      strengths.push('Demonstrates practical project implementation experience.');
    }
    if (hasExperience > 10) {
      strengths.push('Includes relevant internship or practical work history.');
    }

    if (missingKeywords.length > 0) {
      improvements.push(`Missing critical high-converting ATS keywords for ${targetRole}: ${missingKeywords.join(', ')}.`);
    }
    if (hasProjects <= 10) {
      improvements.push('Add a dedicated "Key Live Projects" section with GitHub links and quantitative results (e.g. "Built MERN app handling 10k users").');
    }
    if (!text.includes('metrics') && !text.includes('%') && !text.includes('reduced') && !text.includes('improved')) {
      improvements.push('Use action verbs and metric numbers (e.g. "Improved page load speed by 35%" instead of "Worked on frontend").');
    }

    return NextResponse.json({
      score: totalScore,
      matchedKeywords,
      missingKeywords,
      strengths: strengths.length ? strengths : ['Basic layout structure present.'],
      improvements,
      recommendedCourseSlug:
        targetKey === 'data-science'
          ? 'data-science-machine-learning'
          : targetKey === 'java-enterprise'
          ? 'java-full-stack-developer'
          : targetKey === 'cloud-devops'
          ? 'cloud-computing-devops'
          : 'full-stack-web-development',
    });
  } catch (error) {
    console.error('Resume Grader error:', error);
    return NextResponse.json({ error: 'Failed to grade resume' }, { status: 500 });
  }
}
