import { NextResponse } from 'next/server';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
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
            system: `You are the KodeToCareer AI Senior Career Counselor. Guide students in India looking to get job-ready in 4-6 months with courses starting at ₹5,000/month.
Courses offered: Full Stack MERN, Data Science & AI, Java Full Stack, Cloud DevOps, UI/UX Design, Python Data Analytics, Digital Marketing.
Always give encouraging, concrete advice with step-by-step roadmaps, salary expectations, and KodeToCareer course recommendations.`,
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

    // Intelligent Rules-Based Career Counselor Engine (Fallback / Default)
    let reply = '';
    let recommendations: { title: string; slug: string; fee: string; duration: string }[] = [];

    if (query.includes('mern') || query.includes('react') || query.includes('frontend') || query.includes('fullstack') || query.includes('web')) {
      reply = `Great choice! **Full Stack MERN Development** is one of the highest-demand career tracks in India right now with over 15,000+ open job positions.

Here is your 4-Month Actionable Roadmap:
1. **Month 1:** Modern JavaScript ES6+, HTML5/CSS3, Tailwind CSS, & Responsive Design
2. **Month 2:** React 19, State Management (Zustand/Redux), Next.js App Router
3. **Month 3:** Node.js, Express, MongoDB, REST & GraphQL APIs, JWT Auth
4. **Month 4:** Deploying Production Apps, Microservices, 3 Industry Live Projects & Placement Drive

💡 **Expected Starting Salary:** ₹5.5 LPA - ₹12 LPA`;
      recommendations.push({
        title: 'Full Stack MERN Developer Academy',
        slug: 'full-stack-web-development',
        fee: '₹5,000/mo',
        duration: '4 Months',
      });
    } else if (query.includes('data science') || query.includes('ai') || query.includes('machine learning') || query.includes('python')) {
      reply = `Data Science & AI is transforming every major industry. At KodeToCareer, our program takes you from Python basics to deploying generative AI models.

Here is your 6-Month Actionable Roadmap:
1. **Month 1-2:** Python Programming, Pandas, NumPy, Data Cleaning & EDA
2. **Month 3:** SQL Mastery, PostgreSQL, PowerBI & Tableau Dashboards
3. **Month 4:** Machine Learning (Scikit-Learn, Regression, Classification)
4. **Month 5-6:** Deep Learning (PyTorch/TensorFlow), LLM Fine-Tuning & GenAI Projects

💡 **Expected Starting Salary:** ₹6 LPA - ₹14 LPA`;
      recommendations.push({
        title: 'Data Science & Generative AI Masterclass',
        slug: 'data-science-machine-learning',
        fee: '₹6,000/mo',
        duration: '6 Months',
      });
    } else if (query.includes('java') || query.includes('spring') || query.includes('backend')) {
      reply = `Java Enterprise Backend is heavily favored by MNCs, Fintech, and Tier-1 engineering firms.

Here is your 5-Month Actionable Roadmap:
1. **Month 1:** Java Core, OOPs Architecture, Collections & Multithreading
2. **Month 2:** Data Structures & Algorithms (150+ LeetCode problems solved)
3. **Month 3:** Spring Boot 3, Hibernate/JPA, Microservices Architecture
4. **Month 4-5:** Docker, Kafka, JUnit Testing, AWS Deployment & Live Projects

💡 **Expected Starting Salary:** ₹6 LPA - ₹15 LPA`;
      recommendations.push({
        title: 'Enterprise Java & Spring Boot Full Stack',
        slug: 'java-full-stack-developer',
        fee: '₹5,500/mo',
        duration: '5 Months',
      });
    } else if (query.includes('cloud') || query.includes('devops') || query.includes('aws')) {
      reply = `Cloud Engineering & DevOps professionals enjoy some of the highest entry-level packages in India.

Here is your 4-Month Actionable Roadmap:
1. **Month 1:** Linux System Administration, Bash Scripting, Networking Fundamentals
2. **Month 2:** AWS Cloud Solutions Architecture & Infrastructure Setup
3. **Month 3:** Docker Containerization, Kubernetes Orchestration, Terraform IaC
4. **Month 4:** CI/CD Pipelines (GitHub Actions/Jenkins), Monitoring (Prometheus/Grafana)

💡 **Expected Starting Salary:** ₹6.5 LPA - ₹16 LPA`;
      recommendations.push({
        title: 'Cloud DevOps & AWS Architect Academy',
        slug: 'cloud-computing-devops',
        fee: '₹6,000/mo',
        duration: '4 Months',
      });
    } else if (query.includes('salary') || query.includes('placement') || query.includes('job') || query.includes('hired')) {
      reply = `At KodeToCareer, our focus is 100% placement-first:
• **95% Success Rate** across 1,200+ graduates.
• **300+ Hiring Partners** including Amazon, Microsoft, TCS, Infosys, and high-growth startups.
• **1-on-1 Career Mentorship**, resume polishing, GitHub portfolio reviews, and unlimited mock interviews.
• **Internship Included**: You get a 2-month industry internship certificate to put on your resume before you graduate!`;
    } else {
      const nameGreeting = userProfile?.name ? `Hello ${userProfile.name}! ` : 'Hello! ';
      reply = `${nameGreeting}Welcome to KodeToCareer AI Guidance! I am your 24/7 Senior Career Counselor.

Whether you are a college student, recent graduate, or working professional looking to switch careers, I can help you choose the right path.

What domain interests you the most?
1. **Full Stack Web Development (MERN)**
2. **Data Science & Generative AI**
3. **Java Enterprise Backend**
4. **Cloud Computing & DevOps**
5. **UI/UX Product Design**

Tell me your target role or ask any question!`;
      recommendations.push(
        { title: 'Full Stack MERN Developer', slug: 'full-stack-web-development', fee: '₹5,000/mo', duration: '4 Months' },
        { title: 'Data Science & AI Masterclass', slug: 'data-science-machine-learning', fee: '₹6,000/mo', duration: '6 Months' }
      );
    }

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
