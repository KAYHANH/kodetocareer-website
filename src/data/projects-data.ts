export interface StudentProject {
  id: string;
  title: string;
  slug: string;
  category: string;             // 'Development' | 'Data & AI' | 'Design' | 'Marketing'
  courseSlug: string;           // Maps to course slug e.g. 'mern-stack-development'
  courseName: string;
  studentName: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  tagline: string;
  overview: string;
  outcomes: string[];
  challenges: string;
  solution: string;
  screenshot: string;
  githubUrl?: string;
  demoUrl?: string;
}

export const STUDENT_PROJECTS: StudentProject[] = [
  {
    id: 'proj-1',
    title: 'AI-Powered Mock Interview Platform',
    slug: 'ai-mock-interviewer-platform',
    category: 'Development',
    courseSlug: 'mern-stack-development',
    courseName: 'MERN Stack Development + AI Integration',
    studentName: 'Rohan Sharma',
    difficulty: 'Advanced',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Gemini AI API', 'Tailwind CSS'],
    tagline: 'An automated platform conducting realistic developer technical interviews with AI evaluation.',
    overview: 'This capstone project simulates real-world developer hiring rounds. It generates contextual technical questions based on the candidate\'s resume, records audio/text responses, and provides comprehensive feedback on code performance, communication skills, and architectural knowledge using the Gemini API.',
    outcomes: [
      'Implemented real-time speech-to-text response capturing.',
      'Created custom evaluation algorithm tracking correctness, formatting, and optimization suggestions.',
      'Designed responsive dashboard showing progress analytics over multiple mock trials.'
    ],
    challenges: 'Integrating the streaming voice response with the Gemini completion API while keeping response latency under 1 second.',
    solution: 'Designed a buffer-caching middleware that batches transcriptions locally before dispatching to the LLM agent model.',
    screenshot: '/banners/mern_banner_1783163159443.png',
    githubUrl: 'https://github.com/kodetocareer/ai-mock-interviewer',
    demoUrl: 'https://ai-interviewer.kodetocareer.com'
  },
  {
    id: 'proj-2',
    title: 'Deep Learning Pneumonia Diagnoser',
    slug: 'deep-learning-pneumonia-diagnoser',
    category: 'Data & AI',
    courseSlug: 'data-science-machine-learning',
    courseName: 'Data Science & Machine Learning Core',
    studentName: 'Priya Iyer',
    difficulty: 'Advanced',
    tags: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'Streamlit', 'ResNet50'],
    tagline: 'A CNN computer vision model detecting pneumonia indicators from chest X-Ray image uploads.',
    overview: 'This project utilizes deep convolutional neural networks (CNNs) trained on chest X-Ray datasets. It classifies images into normal or bacterial/viral pneumonia indicators, showing heatmaps of detected anomaly areas to assist medical analysts.',
    outcomes: [
      'Achieved 96.2% diagnostic accuracy on the validation dataset.',
      'Utilized Grad-CAM to highlight classification visual decision regions in x-ray uploads.',
      'Created an interactive web app with Streamlit for doctor-facing analysis.'
    ],
    challenges: 'Handling dataset imbalance where viral pneumonia samples were significantly fewer than normal samples.',
    solution: 'Implemented data augmentation techniques including zoom, shear, and brightness shifting inside the training pipeline.',
    screenshot: '/banners/datascience_banner_1783163185035.png',
    githubUrl: 'https://github.com/kodetocareer/xray-pneumonia-cnn',
    demoUrl: 'https://pneumonia-detect.kodetocareer.com'
  },
  {
    id: 'proj-3',
    title: 'Enterprise Banking Ledger & Fraud Detection',
    slug: 'enterprise-banking-ledger-fraud-detection',
    category: 'Development',
    courseSlug: 'java-full-stack',
    courseName: 'Java Full Stack Developer Program',
    studentName: 'Abhishek Patel',
    difficulty: 'Advanced',
    tags: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'ThymeLeaf', 'Spring Security'],
    tagline: 'Secure transaction processing engine with threshold alert rules protecting account ledgers.',
    overview: 'A robust double-entry transaction engine enforcing strict ACID consistency for user transactions. Features transaction volume rate-limiting and location mismatch alerts to flag anomalous account activity.',
    outcomes: [
      'Designed double-entry schema preserving balance consistency under heavy load concurrent tests.',
      'Integrated JSON Web Tokens (JWT) and multi-factor authorization safeguards.',
      'Optimized query performance using indexes and stored transaction procedures.'
    ],
    challenges: 'Preventing race conditions where multiple rapid transactions could result in negative balances.',
    solution: 'Enforced database-level pessimistic locks (`SELECT FOR UPDATE`) on account rows during transaction balance processing.',
    screenshot: '/banners/java_banner_1783163260009.png',
    githubUrl: 'https://github.com/kodetocareer/enterprise-banking-ledger',
    demoUrl: 'https://ledger.kodetocareer.com'
  },
  {
    id: 'proj-4',
    title: 'MedEasy Healthcare Mobile Interface',
    slug: 'medeasy-healthcare-mobile-interface',
    category: 'Design',
    courseSlug: 'graphic-design-ui-ux',
    courseName: 'Graphic Design + UI/UX Product Design Systems',
    studentName: 'Sneha Verma',
    difficulty: 'Intermediate',
    tags: ['Figma', 'UI Design', 'UX Research', 'Design Systems', 'Interactive Prototyping'],
    tagline: 'A comprehensive mobile app case study streamlining telemedicine bookings and digital prescriptions.',
    overview: 'This UI/UX project resolves friction points in patient-doctor communications. Features appointment booking flows, medical history uploads, secure messaging, and clear digital prescription dashboards.',
    outcomes: [
      'Conducted user interviews with 15 patients to identify onboarding bottlenecks.',
      'Built a consistent design system with typography scale, accessible contrast colors, and modular components.',
      'Produced a high-fidelity clickable prototype in Figma showing end-to-end flows.'
    ],
    challenges: 'Designing medical history upload flows that feel simple and secure to elderly users.',
    solution: 'Designed a simplified multi-step wizard using larger accessibility fonts and floating step indicators.',
    screenshot: '/banners/design_banner_1783163217133.png',
    demoUrl: 'https://figma.com/file/medeasy-telehealth-prototype'
  },
  {
    id: 'proj-5',
    title: 'E-Commerce User Cohort Retention Dashboard',
    slug: 'ecommerce-cohort-retention-dashboard',
    category: 'Data & AI',
    courseSlug: 'data-analytics',
    courseName: 'Data Analytics & Business Intelligence',
    studentName: 'Karan Malhotra',
    difficulty: 'Intermediate',
    tags: ['SQL', 'Python', 'Pandas', 'Power BI', 'Google Looker Studio'],
    tagline: 'Cohort analysis and customer lifetime value mapping extracting sales indicators from raw datasets.',
    overview: 'This data analytics project structures over 500,000 transaction rows. It extracts user signup cohorts, maps month-on-month retention rates, and flags categories showing higher churn risk.',
    outcomes: [
      'Wrote optimized SQL window queries performing cohort grouping calculations.',
      'Mapped customer lifetime value (CLV) variables showing profitable user segments.',
      'Built a dashboard with filters for category, region, and acquisition dates.'
    ],
    challenges: 'Dealing with raw transaction logs containing duplicate customer records and missing return metrics.',
    solution: 'Created a staging Python cleaning pipeline using Pandas to resolve null values and deduplicate data.',
    screenshot: '/banners/analytics_banner_1783163237890.png',
    githubUrl: 'https://github.com/kodetocareer/ecommerce-retention-analytics'
  }
];
