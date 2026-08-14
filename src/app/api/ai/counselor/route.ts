import { NextResponse } from 'next/server';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Semantic Domain Profile Definition
interface DomainProfile {
  id: string;
  keywords: string[];
  weights: Record<string, number>;
  reply: string;
  recommendations: { title: string; slug: string; fee: string; duration: string }[];
}

const DOMAIN_PROFILES: DomainProfile[] = [
  {
    id: 'confused',
    keywords: ['dont know', "don't know", 'confused', 'suggest', 'help', 'which course', 'not sure', 'choose', 'advice', 'guide', 'lost', 'where to start', 'recommend'],
    weights: { confused: 5, choose: 4, suggest: 4, help: 3 },
    reply: `No worries at all! Picking the right tech career depends on what you enjoy most. Here is a simple guide to help you decide:

• **If you love creating visual websites & interactive apps**:
👉 **Full Stack MERN** (Highest job openings in India, 4-Month program).

• **If you like analyzing numbers, charts & business trends** (No heavy coding):
👉 **Data Analytics & BI** (Great for non-tech/beginners, 4-Month program).

• **If you want to work with AI, Machine Learning & Python**:
👉 **Data Science & AI Masterclass** (High starting packages, 6-Month program).

• **If you want stable MNC/Enterprise jobs**:
👉 **Java Full Stack & Spring Boot** (Favored by IT giants, 5-Month program).

Click any of the recommended programs below to view full details!`,
    recommendations: [
      { title: 'Full Stack MERN Developer', slug: 'mern-stack-development', fee: '₹6,000/mo', duration: '4 Months' },
      { title: 'Data Analytics & Business Intelligence', slug: 'data-analytics', fee: '₹6,000/mo', duration: '4 Months' },
      { title: 'Data Science & AI Masterclass', slug: 'data-science-machine-learning', fee: '₹6,000/mo', duration: '6 Months' }
    ]
  },
  {
    id: 'non-tech',
    keywords: ['non tech', 'non-tech', 'bcom', 'b.com', 'bba', 'arts', 'switch', 'no coding', 'beginner', 'fresher', 'non cs', 'non-cs'],
    weights: { 'non-tech': 5, bcom: 5, bba: 5, switch: 4, 'no coding': 5 },
    reply: `You do NOT need a Computer Science degree to get a high-paying tech job! Over 40% of our successful graduates come from Non-CS backgrounds like B.Com, BBA, BA, and non-tech jobs.

Here are the 2 best career paths for non-tech backgrounds:

1. **Data Analytics & BI (No Advanced Math/Coding)**:
   - Learn Excel, SQL, Power BI, Tableau, and Python data tools.
   - Ideal for business minds, problem solvers, and analytical thinkers.
   - **Average Salary:** ₹5 LPA - ₹10 LPA.

2. **Full Stack MERN Web Development**:
   - Build real-world web apps step-by-step from HTML/CSS to React & Node.js.
   - **Average Salary:** ₹5.5 LPA - ₹12 LPA.

Click below to explore these beginner-friendly programs!`,
    recommendations: [
      { title: 'Data Analytics & Business Intelligence', slug: 'data-analytics', fee: '₹6,000/mo', duration: '4 Months' },
      { title: 'Full Stack MERN Developer', slug: 'mern-stack-development', fee: '₹6,000/mo', duration: '4 Months' }
    ]
  },
  {
    id: 'mern',
    keywords: ['mern', 'react', 'frontend', 'fullstack', 'full stack', 'web', 'javascript', 'node', 'express', 'mongodb', 'nextjs', 'tailwind', 'html', 'css', 'website', 'app development'],
    weights: { mern: 6, react: 5, fullstack: 5, web: 4, node: 4, frontend: 4 },
    reply: `Great choice! **Full Stack MERN Development** is one of the highest-demand career tracks in India right now with over 15,000+ open job positions.

Here is your 4-Month Actionable Roadmap:
1. **Month 1:** Modern JavaScript ES6+, HTML5/CSS3, Tailwind CSS, & Responsive Design
2. **Month 2:** React 19, State Management (Zustand/Redux), Next.js App Router
3. **Month 3:** Node.js, Express, MongoDB, REST & GraphQL APIs, JWT Auth
4. **Month 4:** Deploying Production Apps, Microservices, 3 Industry Live Projects & Placement Drive

💡 **Expected Starting Salary:** ₹5.5 LPA - ₹12 LPA`,
    recommendations: [
      { title: 'Full Stack MERN Developer Academy', slug: 'mern-stack-development', fee: '₹6,000/mo', duration: '4 Months' }
    ]
  },
  {
    id: 'data-science',
    keywords: ['data science', 'machine learning', 'python', 'genai', 'generative ai', 'deep learning', 'ai', 'artificial intelligence', 'chatgpt', 'llm', 'pytorch', 'tensorflow', 'models'],
    weights: { 'data science': 6, 'machine learning': 5, genai: 5, ai: 4, python: 4 },
    reply: `Data Science & AI is transforming every major industry. At KodeToCareer, our program takes you from Python basics to deploying generative AI models.

Here is your 6-Month Actionable Roadmap:
1. **Month 1-2:** Python Programming, Pandas, NumPy, Data Cleaning & EDA
2. **Month 3:** SQL Mastery, PostgreSQL, PowerBI & Tableau Dashboards
3. **Month 4:** Machine Learning (Scikit-Learn, Regression, Classification)
4. **Month 5-6:** Deep Learning (PyTorch/TensorFlow), LLM Fine-Tuning & GenAI Projects

💡 **Expected Starting Salary:** ₹6 LPA - ₹14 LPA`,
    recommendations: [
      { title: 'Data Science & Generative AI Masterclass', slug: 'data-science-machine-learning', fee: '₹6,000/mo', duration: '6 Months' },
      { title: 'Industry-Ready MLOps & AI Systems', slug: 'mlops-ai-systems', fee: '₹7,000/mo', duration: '6 Months' }
    ]
  },
  {
    id: 'data-analytics',
    keywords: ['analytics', 'powerbi', 'power bi', 'excel', 'tableau', 'sql', 'dashboard', 'charts', 'reports', 'business intelligence', 'bi', 'insights', 'data analyst'],
    weights: { analytics: 6, powerbi: 5, excel: 4, sql: 4, tableau: 4, 'data analyst': 5 },
    reply: `Data Analytics is the fastest entry point into tech! Companies rely on Data Analysts to turn raw numbers into executive business strategy.

Here is your 4-Month Actionable Roadmap:
1. **Month 1:** Advanced Excel, Pivot Tables, VLOOKUP/XLOOKUP & Financial Modeling
2. **Month 2:** Relational Databases & SQL (Queries, Joins, Window Functions)
3. **Month 3:** Power BI & Tableau (Interactive Dashboards, DAX Queries)
4. **Month 4:** Python for Data Analytics & Real-world Business Capstone Projects

💡 **Expected Starting Salary:** ₹5 LPA - ₹11 LPA`,
    recommendations: [
      { title: 'Data Analytics & Business Intelligence', slug: 'data-analytics', fee: '₹6,000/mo', duration: '4 Months' }
    ]
  },
  {
    id: 'java',
    keywords: ['java', 'spring', 'springboot', 'spring boot', 'hibernate', 'backend', 'dsa', 'leetcode', 'enterprise', 'mnc', 'tcs', 'infosys', 'wipro', 'multithreading'],
    weights: { java: 6, spring: 5, springboot: 5, backend: 4, dsa: 4 },
    reply: `Java Enterprise Backend is heavily favored by MNCs, Fintech, and Tier-1 engineering firms (TCS, Infosys, Wipro, Capgemini, Accenture).

Here is your 5-Month Actionable Roadmap:
1. **Month 1:** Java Core, OOPs Architecture, Collections & Multithreading
2. **Month 2:** Data Structures & Algorithms (150+ LeetCode problems solved)
3. **Month 3:** Spring Boot 3, Hibernate/JPA, Microservices Architecture
4. **Month 4-5:** Docker, Kafka, JUnit Testing, AWS Deployment & Live Projects

💡 **Expected Starting Salary:** ₹6 LPA - ₹15 LPA`,
    recommendations: [
      { title: 'Enterprise Java & Spring Boot Full Stack', slug: 'java-full-stack', fee: '₹6,000/mo', duration: '5 Months' }
    ]
  },
  {
    id: 'cloud-devops',
    keywords: ['cloud', 'devops', 'aws', 'amazon', 'docker', 'kubernetes', 'k8s', 'linux', 'bash', 'terraform', 'ci/cd', 'infrastructure', 'servers', 'sysadmin'],
    weights: { devops: 6, cloud: 5, aws: 5, docker: 4, kubernetes: 4 },
    reply: `Cloud Engineering & DevOps professionals enjoy some of the highest entry-level packages in India.

Here is your 4-Month Actionable Roadmap:
1. **Month 1:** Linux System Administration, Bash Scripting, Networking Fundamentals
2. **Month 2:** AWS Cloud Solutions Architecture & Infrastructure Setup
3. **Month 3:** Docker Containerization, Kubernetes Orchestration, Terraform IaC
4. **Month 4:** CI/CD Pipelines (GitHub Actions/Jenkins), Monitoring (Prometheus/Grafana)

💡 **Expected Starting Salary:** ₹6.5 LPA - ₹16 LPA`,
    recommendations: [
      { title: 'Cloud DevOps & AWS Architect Academy', slug: 'cloud-devops', fee: '₹6,000/mo', duration: '4 Months' }
    ]
  },
  {
    id: 'ui-ux',
    keywords: ['ui', 'ux', 'design', 'figma', 'user experience', 'user interface', 'wireframe', 'prototype', 'visual', 'creative', 'graphic', 'product design'],
    weights: { design: 5, ui: 5, ux: 5, figma: 5, product: 3 },
    reply: `UI/UX & Product Design is perfect if you have an eye for creativity, empathy, and visual aesthetics!

Here is your 4-Month Actionable Roadmap:
1. **Month 1:** Design Foundations, Color Theory, Typography, Grid Systems
2. **Month 2:** User Research, Persona Mapping, Wireframing & Information Architecture
3. **Month 3:** Advanced Figma, Component Libraries, Auto-Layout & Interactive Prototyping
4. **Month 4:** Portfolio Case Studies, Design Systems & Placement Preparation

💡 **Expected Starting Salary:** ₹5 LPA - ₹12 LPA`,
    recommendations: [
      { title: 'Graphic Design + UI/UX Product Design Systems', slug: 'graphic-design-ui-ux', fee: '₹6,000/mo', duration: '4 Months' }
    ]
  },
  {
    id: 'digital-marketing',
    keywords: ['marketing', 'digital', 'seo', 'ads', 'meta ads', 'google ads', 'social media', 'content', 'campaigns', 'growth', 'traffic'],
    weights: { marketing: 6, digital: 5, seo: 5, ads: 4 },
    reply: `Digital Marketing with AI teaches you how to run high-ROI campaigns using modern AI tools, Google Ads, and Meta Ads.

Here is your 3-Month Actionable Roadmap:
1. **Month 1:** Search Engine Optimization (SEO), Technical SEO, AI Content Writing
2. **Month 2:** Meta Ads (Facebook/Instagram), Google Search/Display Ads, Analytics
3. **Month 3:** Performance Marketing, Conversion Rate Optimization (CRO) & Live Campaign Budgeting

💡 **Expected Starting Salary:** ₹4.5 LPA - ₹9 LPA`,
    recommendations: [
      { title: 'Digital Marketing with AI & Growth Hacking', slug: 'digital-marketing', fee: '₹6,000/mo', duration: '3 Months' }
    ]
  },
  {
    id: 'fees',
    keywords: ['fee', 'fees', 'cost', 'price', 'pricing', 'installment', 'upfront', 'placed', 'emi', 'discount', 'pay', 'money', 'affordable'],
    weights: { fee: 5, fees: 5, cost: 4, price: 4, upfront: 5, placed: 5 },
    reply: `At KodeToCareer, our fee model is designed to be affordable and outcome-based:

• **Upfront Registration Fee:** ₹6,000 only (starts your live training & hands-on projects).
• **If Placed Fee:** ₹5,000 only AFTER you secure a job (Pay remaining only when placed!).
• **Zero Cost EMI:** Flexible monthly installments available.

Every program includes live mentor sessions, guaranteed internship certification, resume building, and unlimited job interview calls.`,
    recommendations: [
      { title: 'Full Stack MERN Developer', slug: 'mern-stack-development', fee: '₹6,000/mo', duration: '4 Months' },
      { title: 'Data Analytics & Business Intelligence', slug: 'data-analytics', fee: '₹6,000/mo', duration: '4 Months' }
    ]
  },
  {
    id: 'placements',
    keywords: ['salary', 'placement', 'placements', 'job', 'jobs', 'hired', 'hiring', 'company', 'companies', 'guarantee', 'counselor', 'lpa', 'ctc', 'resume'],
    weights: { placement: 5, placements: 5, salary: 5, job: 4, hired: 4 },
    reply: `At KodeToCareer, our focus is 100% placement-first:
• **94% Placement Rate** across 1,200+ graduates.
• **500+ Hiring Partners** including Amazon, Microsoft, TCS, Infosys, Deloitte, Wipro, and high-growth startups.
• **1-on-1 Career Mentorship**, resume polishing, GitHub portfolio reviews, and unlimited mock interviews.
• **2-Month Internship Certificate** included on real-world industry projects.

Tell me your target role to see starting salary projections!`,
    recommendations: [
      { title: 'Full Stack MERN Developer', slug: 'mern-stack-development', fee: '₹6,000/mo', duration: '4 Months' },
      { title: 'Data Science & AI Masterclass', slug: 'data-science-machine-learning', fee: '₹6,000/mo', duration: '6 Months' }
    ]
  }
];

// Semantic Similarity Search Engine
function semanticSearch(query: string): DomainProfile | null {
  const normalized = query.toLowerCase();
  let maxScore = 0;
  let bestProfile: DomainProfile | null = null;

  for (const profile of DOMAIN_PROFILES) {
    let score = 0;
    for (const kw of profile.keywords) {
      if (normalized.includes(kw)) {
        const weight = profile.weights[kw] || 2;
        score += weight;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestProfile = profile;
    }
  }

  return maxScore > 0 ? bestProfile : null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, userProfile } = body as {
      messages: Message[];
      userProfile?: {
        name?: string;
        academicStatus?: string;
        graduationYear?: string;
        targetRole?: string;
      };
    };

    const lastUserMessage = messages[messages.length - 1]?.content || '';
    const query = lastUserMessage.toLowerCase();

    // Check if external API key is provided
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (apiKey) {
      try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 1000,
            system: `You are the KodeToCareer AI Senior Career Counselor. You provide expert tech career guidance for students & professionals in India.
Courses offered:
- Full Stack MERN Development (4 Months, ₹6,000 Upfront + ₹5,000 If Placed, slug: mern-stack-development)
- Data Analytics & Business Intelligence (4 Months, ₹6,000 Upfront + ₹5,000 If Placed, slug: data-analytics)
- Data Science & Generative AI (6 Months, ₹6,000 Upfront + ₹6,000 If Placed, slug: data-science-machine-learning)
- Industry-Ready MLOps & AI Systems (6 Months, ₹7,000 Upfront + ₹7,000 If Placed, slug: mlops-ai-systems)
- Enterprise Java & Spring Boot (5 Months, ₹6,000 Upfront + ₹5,000 If Placed, slug: java-full-stack)
- Cloud Computing & DevOps (4 Months, ₹6,000 Upfront + ₹5,000 If Placed, slug: cloud-devops)
- Graphic Design + UI/UX Product Design (4 Months, ₹6,000 Upfront + ₹5,000 If Placed, slug: graphic-design-ui-ux)
- Digital Marketing with AI (3 Months, ₹6,000 Upfront + ₹5,000 If Placed, slug: digital-marketing)

Guide users with step-by-step roadmaps, salary expectations, career switch tips, and direct course recommendations. Always be encouraging, clear, and actionable.`,
            messages: messages.map((m) => ({
              role: m.role === 'user' ? 'user' : 'assistant',
              content: m.content,
            })),
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const replyText = data.content?.[0]?.text || '';
          if (replyText) {
            return NextResponse.json({ reply: replyText });
          }
        }
      } catch (err) {
        console.warn('Anthropic API call failed, using intelligent counselor engine fallback.', err);
      }
    }

    // Run Semantic Search
    const matchedProfile = semanticSearch(query);

    if (matchedProfile) {
      return NextResponse.json({
        reply: matchedProfile.reply,
        recommendations: matchedProfile.recommendations,
      });
    }

    // Default Fallback
    const nameGreeting = userProfile?.name ? `Hello ${userProfile.name}! ` : 'Hello! ';
    const reply = `${nameGreeting}Welcome to KodeToCareer AI Guidance! I am your 24/7 Senior Career Counselor.

Whether you are a college student, recent graduate, or working professional looking to switch careers, I can help you choose the right path.

Tell me about your background or click one of the recommended programs below to explore!`;
    const recommendations = [
      { title: 'Full Stack MERN Developer', slug: 'mern-stack-development', fee: '₹6,000/mo', duration: '4 Months' },
      { title: 'Data Analytics & Business Intelligence', slug: 'data-analytics', fee: '₹6,000/mo', duration: '4 Months' },
      { title: 'Data Science & AI Masterclass', slug: 'data-science-machine-learning', fee: '₹6,000/mo', duration: '6 Months' }
    ];

    return NextResponse.json({
      reply,
      recommendations,
    });
  } catch (error) {
    console.error('Error in counselor API:', error);
    return NextResponse.json(
      { reply: 'I apologize, but I encountered a temporary connection issue. Please try asking again or call our career advisors directly at +91 96679 75616.' },
      { status: 500 }
    );
  }
}
