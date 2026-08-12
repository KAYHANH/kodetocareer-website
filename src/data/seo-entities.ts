export interface EntityRelation {
  id: string;
  name: string;
  category: 'course' | 'technology' | 'role' | 'persona' | 'location' | 'study-abroad';
  parentEntity?: string;
  relatedEntities: string[];
  description: string;
}

export const SEO_ENTITIES: Record<string, EntityRelation> = {
  'mern-stack': {
    id: 'mern-stack',
    name: 'Full Stack MERN Web Development',
    category: 'course',
    relatedEntities: ['react', 'nodejs', 'express', 'mongodb', 'fullstack-developer', 'bca-students', 'freshers', 'delhi', 'bangalore'],
    description: 'Comprehensive 4-month web development program covering React, Node.js, Express, and MongoDB with production live projects and placement support.',
  },
  'data-science': {
    id: 'data-science',
    name: 'Data Science & Machine Learning Core',
    category: 'course',
    relatedEntities: ['python', 'statistics', 'scikit-learn', 'tensorflow', 'data-scientist', 'btech-students', 'mumbai', 'hyderabad'],
    description: '6-month data science and AI masterclass taking students from Python foundations to deep learning and LLM fine-tuning.',
  },
  'data-analytics': {
    id: 'data-analytics',
    name: 'Data Analytics & Business Intelligence',
    category: 'course',
    relatedEntities: ['excel', 'sql', 'powerbi', 'tableau', 'data-analyst', 'bba-students', 'career-switchers', 'lucknow', 'pune'],
    description: '4-month career track mastering SQL, Power BI, Excel dashboards, and Python data tools for non-technical and technical learners alike.',
  },
  'java-full-stack': {
    id: 'java-full-stack',
    name: 'Enterprise Java & Spring Boot Full Stack',
    category: 'course',
    relatedEntities: ['java', 'springboot', 'hibernate', 'microservices', 'java-developer', 'btech-students', 'tcs-wipro', 'noida', 'chennai'],
    description: '5-month enterprise developer program focusing on Java Core, DSA, Spring Boot 3, Microservices, and cloud deployments.',
  },
  'cloud-devops': {
    id: 'cloud-devops',
    name: 'Cloud Computing & DevOps Infrastructure',
    category: 'course',
    relatedEntities: ['aws', 'docker', 'kubernetes', 'terraform', 'devops-engineer', 'freshers', 'bangalore', 'gurgaon'],
    description: '4-month cloud architecture and DevOps engineering program covering AWS, Docker, K8s, and automated CI/CD pipelines.',
  },
  'graphic-design-ui-ux': {
    id: 'graphic-design-ui-ux',
    name: 'Graphic Design & UI/UX Product Design Systems',
    category: 'course',
    relatedEntities: ['figma', 'wireframing', 'user-research', 'ui-ux-designer', 'non-tech', 'delhi', 'mumbai'],
    description: '4-month visual product design track mastering Figma prototypes, accessible design systems, and portfolio case studies.',
  },
  'digital-marketing': {
    id: 'digital-marketing',
    name: 'Digital Marketing with AI & Growth Hacking',
    category: 'course',
    relatedEntities: ['seo', 'google-ads', 'meta-ads', 'analytics', 'growth-marketer', 'bba-students', 'online'],
    description: '3-month performance marketing and SEO masterclass utilizing AI tools for campaign scaling and lead generation.',
  },
};

export const SEMANTIC_CLUSTERS = {
  'software-engineering': [
    { name: 'MERN Stack Development', slug: 'mern-stack-development' },
    { name: 'Java Full Stack Developer', slug: 'java-full-stack' },
    { name: 'Python Programming', slug: 'python-programming' },
  ],
  'data-and-ai': [
    { name: 'Data Science & Machine Learning', slug: 'data-science-machine-learning' },
    { name: 'Data Analytics & BI', slug: 'data-analytics' },
    { name: 'MLOps & AI Systems', slug: 'mlops-ai-systems' },
  ],
  'cloud-and-infrastructure': [
    { name: 'Cloud Computing & DevOps', slug: 'cloud-devops' },
  ],
  'design-and-growth': [
    { name: 'UI/UX Product Design', slug: 'graphic-design-ui-ux' },
    { name: 'Digital Marketing with AI', slug: 'digital-marketing' },
    { name: 'Videography & Editing', slug: 'videography-video-editing' },
  ],
};
