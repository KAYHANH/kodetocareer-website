import { NextResponse } from 'next/server';

interface InterviewQuestion {
  id: number;
  question: string;
  category: string;
  sampleAnswerHint: string;
}

const interviewQuestionsBank: Record<string, InterviewQuestion[]> = {
  'fullstack-mern': [
    {
      id: 1,
      question: 'Can you explain the Virtual DOM in React and how reconciliation differs from real DOM manipulation?',
      category: 'React & Frontend',
      sampleAnswerHint: 'Mention React elements, diffing algorithm, Fiber architecture, and batched updates for performance.',
    },
    {
      id: 2,
      question: 'What is the Node.js Event Loop? Explain how non-blocking I/O works with libuv.',
      category: 'Node.js & Backend',
      sampleAnswerHint: 'Discuss call stack, event queue, microtasks (Promises), macrotasks (setTimeout), and single-threaded concurrency.',
    },
    {
      id: 3,
      question: 'How do index scans work in MongoDB versus collection scans, and how do you optimize slow aggregation queries?',
      category: 'Database & MongoDB',
      sampleAnswerHint: 'Explain compound indexes, explain() plan analysis, index cardinality, and avoiding in-memory sorting.',
    },
    {
      id: 4,
      question: 'How do you securely handle JWT authentication, refresh tokens, and CSRF protection in a full-stack MERN application?',
      category: 'Security & Auth',
      sampleAnswerHint: 'Mention HttpOnly SameSite cookies for refresh tokens, short-lived access tokens in memory, and CSRF protection.',
    },
    {
      id: 5,
      question: 'Describe a production bug or performance bottleneck you encountered in a React/Node app and how you resolved it.',
      category: 'System Design & Debugging',
      sampleAnswerHint: 'Use the STAR method: Situation, Task, Action (profiling/caching), Result (e.g. 50% faster API latency).',
    },
  ],
  'data-science': [
    {
      id: 1,
      question: 'What is the difference between Bias and Variance in machine learning, and how do you address overfitting?',
      category: 'Machine Learning Fundamentals',
      sampleAnswerHint: 'Discuss regularization (L1/L2), cross-validation, data augmentation, and model complexity tuning.',
    },
    {
      id: 2,
      question: 'Explain how Random Forests differ from XGBoost/Gradient Boosting algorithms.',
      category: 'Algorithms',
      sampleAnswerHint: 'Mention bagging (independent parallel trees) vs boosting (sequential correction of residual errors).',
    },
    {
      id: 3,
      question: 'How do you handle missing values and severe class imbalance in tabular datasets?',
      category: 'Data Preprocessing',
      sampleAnswerHint: 'Cover SMOTE, class weight adjustment, stratifying folds, and choosing PR-AUC over ROC-AUC.',
    },
    {
      id: 4,
      question: 'Explain the Transformer architecture and the self-attention mechanism used in modern LLMs.',
      category: 'Deep Learning & GenAI',
      sampleAnswerHint: 'Describe Query, Key, Value vectors, scaled dot-product attention, positional encoding, and multi-head attention.',
    },
    {
      id: 5,
      question: 'How do you write optimized SQL queries with CTEs and Window Functions for data analysis?',
      category: 'SQL & Data Engineering',
      sampleAnswerHint: 'Discuss PARTITION BY, ROW_NUMBER(), DENSE_RANK(), and avoiding correlated subqueries.',
    },
  ],
  'java-enterprise': [
    {
      id: 1,
      question: 'Explain the Spring Boot auto-configuration mechanism and how @EnableAutoConfiguration works under the hood.',
      category: 'Java Core & Spring',
      sampleAnswerHint: 'Mention spring.factories, AutoConfigurationImportSelector, conditional annotations like @ConditionalOnClass.',
    },
    {
      id: 2,
      question: 'What is the difference between Hibernate session get() and load() methods, and how do you prevent N+1 query issues?',
      category: 'ORM & Database',
      sampleAnswerHint: 'Discuss proxy objects, lazy loading, JOIN FETCH in JPQL, and EntityGraph to eliminate N+1 queries.',
    },
    {
      id: 3,
      question: 'How do microservices communicate using REST vs Apache Kafka, and how do you implement circuit breakers with Resilience4j?',
      category: 'Microservices & Messaging',
      sampleAnswerHint: 'Explain synchronous vs event-driven asynchronous messaging, fault tolerance, fallback methods, and state transitions.',
    },
    {
      id: 4,
      question: 'Explain Java memory management: Heap vs Stack, Metaspace, and Garbage Collection algorithms like G1GC.',
      category: 'JVM Internals',
      sampleAnswerHint: 'Cover Eden, Survivor space, Tenured generation, G1GC pause time targets, and memory leak diagnosis.',
    },
    {
      id: 5,
      question: 'Describe how you design secure Spring Security JWT filter chains and role-based access control (RBAC).',
      category: 'Security & Enterprise Architecture',
      sampleAnswerHint: 'Discuss OncePerRequestFilter, SecurityContextHolder, BCrypt, and method-level security with @PreAuthorize.',
    },
  ],
  'cloud-devops': [
    {
      id: 1,
      question: 'How do Docker image layers work, and how do multi-stage builds optimize production container size?',
      category: 'Containerization & Docker',
      sampleAnswerHint: 'Mention layer caching, Copy-on-Write, slim base images, and separating build-time dependencies from runtime.',
    },
    {
      id: 2,
      question: 'Explain Kubernetes Pod lifecycle, ReplicaSets, and how Deployment rolling updates prevent downtime.',
      category: 'Orchestration & Kubernetes',
      sampleAnswerHint: 'Discuss readiness vs liveness probes, maxSurge, maxUnavailable, and kubectl rollout undo.',
    },
    {
      id: 3,
      question: 'What is Infrastructure as Code (IaC)? Compare Terraform state management with AWS CloudFormation.',
      category: 'IaC & Automation',
      sampleAnswerHint: 'Cover remote state locking (S3/DynamoDB), plan/apply execution lifecycle, and declarative modules.',
    },
    {
      id: 4,
      question: 'How do you set up a zero-downtime CI/CD pipeline using GitHub Actions or Jenkins with automated testing?',
      category: 'CI/CD Pipelines',
      sampleAnswerHint: 'Discuss feature branch workflows, secret management, automated staging deployments, and Blue/Green strategies.',
    },
    {
      id: 5,
      question: 'How do Prometheus and Grafana collect and visualize metrics from distributed microservices?',
      category: 'Observability & Monitoring',
      sampleAnswerHint: 'Explain pull-based metric scraping, PromQL, Alertmanager rules, and key RED/USE metrics.',
    },
  ],
  'ui-ux-design': [
    {
      id: 1,
      question: 'Explain your step-by-step user research and persona creation process before designing wireframes.',
      category: 'UX Research & Discovery',
      sampleAnswerHint: 'Mention user interviews, empathy maps, job-to-be-done framework, and synthesizing pain points into personas.',
    },
    {
      id: 2,
      question: 'How do you create fluid Design Systems in Figma using Auto-Layout, tokens, and component variants?',
      category: 'Design Systems & Figma',
      sampleAnswerHint: 'Discuss design tokens (colors/typography/spacing), component properties, variants, and responsive constraints.',
    },
    {
      id: 3,
      question: 'What is Usability Testing, and how do you iterate designs based on quantitative heatmaps and session recordings?',
      category: 'Usability & Analytics',
      sampleAnswerHint: 'Explain unmoderated vs moderated testing, task success rate, net promoter score, and Hotjar/FullStory analysis.',
    },
    {
      id: 4,
      question: 'Explain the difference between Low-Fidelity Wireframes and High-Fidelity Interactive Prototypes.',
      category: 'Prototyping & Flow',
      sampleAnswerHint: 'Discuss paper sketches vs interactive micro-animations, component states, and usability validation checkpoints.',
    },
    {
      id: 5,
      question: 'How do you collaborate with frontend developers to hand off design specs cleanly?',
      category: 'Developer Hand-off',
      sampleAnswerHint: 'Mention redlines, token exports, asset compression, accessibility (WCAG) contrast checks, and design QA.',
    },
  ],
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, targetRole, questionId, userResponse } = body as {
      action: 'start' | 'evaluate';
      targetRole: string;
      questionId?: number;
      userResponse?: string;
    };

    const roleKey = targetRole in interviewQuestionsBank ? targetRole : 'fullstack-mern';
    const questions = interviewQuestionsBank[roleKey];

    if (action === 'start') {
      return NextResponse.json({
        totalQuestions: questions.length,
        firstQuestion: questions[0],
      });
    }

    if (action === 'evaluate') {
      const qIndex = (questionId || 1) - 1;
      const currentQ = questions[qIndex] || questions[0];
      const answer = (userResponse || '').trim();

      const lengthScore = Math.min(30, Math.round(answer.length / 10));
      const keywordMatches = currentQ.sampleAnswerHint
        .toLowerCase()
        .split(' ')
        .filter((word) => word.length > 4 && answer.toLowerCase().includes(word)).length;

      const techScore = Math.min(50, 20 + keywordMatches * 10);
      const overallScore = Math.min(95, Math.max(40, lengthScore + techScore));

      const isLast = qIndex >= questions.length - 1;
      const nextQuestion = isLast ? null : questions[qIndex + 1];

      let feedback = '';
      if (overallScore >= 80) {
        feedback = 'Excellent answer! You covered core architectural concepts with solid depth.';
      } else if (overallScore >= 60) {
        feedback = 'Good attempt. To get top marks, elaborate more on implementation edge-cases and performance trade-offs.';
      } else {
        feedback = 'Fair answer. Ensure you explain technical terms clearly and provide practical examples.';
      }

      return NextResponse.json({
        questionId: currentQ.id,
        score: overallScore,
        feedback,
        hint: currentQ.sampleAnswerHint,
        isCompleted: isLast,
        nextQuestion,
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Mock Interview API error:', error);
    return NextResponse.json({ error: 'Failed to process interview session' }, { status: 500 });
  }
}
