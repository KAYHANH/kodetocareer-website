export interface CourseSeoContent {
  whatIs: string;
  roadmap: string[];
  projects: { title: string; desc: string }[];
  interviews: { q: string; a: string }[];
  salary: { role: string; range: string }[];
  jobs: string[];
}

export const COURSES_SEO: Record<string, CourseSeoContent> = {
  'mern-stack-development': {
    whatIs: 'MERN Stack stands for MongoDB, Express.js, React.js, and Node.js. It is a full-stack JavaScript framework used to build highly interactive, dynamic, and responsive single-page web applications (SPAs). By utilizing JavaScript for both frontend rendering and backend logic, MERN speeds up development cycles and ensures code reusability.',
    roadmap: [
      'Phase 1: Frontend foundations (HTML5, CSS3, TailwindCSS, ES6+ JavaScript)',
      'Phase 2: Single Page UI creation with React (Components, Hooks, Redux Toolkit)',
      'Phase 3: Rest API server design with Node.js and Express.js framework',
      'Phase 4: Document database schema modeling with MongoDB & Mongoose ORM',
      'Phase 5: AI integration (OpenAI, Gemini APIs, Prompt Engineering)',
      'Phase 6: Deployment, containerization, and Git workflows'
    ],
    projects: [
      { title: 'AI-Powered Project Management Board', desc: 'A Trello-clone featuring auto-generated subtasks, effort estimations, and summary metrics powered by OpenAI APIs.' },
      { title: 'Interactive E-Commerce Platform', desc: 'A full-featured shopping cart system with product search indexes, JWT secure auth, Stripe payment checkout, and order histories.' },
      { title: 'Realtime Document Collaboration Suite', desc: 'A Google Docs-style collaboration editor using socket structures, document version sync, and rich text editors.' }
    ],
    interviews: [
      { q: 'What is the role of Virtual DOM in React?', a: 'Virtual DOM is a lightweight memory representation of the actual DOM. React uses it to compare UI updates (diffing) and re-render only the modified elements (reconciliation), maximizing performance.' },
      { q: 'Explain JWT authentication flow in Node/Express.', a: 'When a user logs in, the server signs a payload containing user details with a secret key, returning a token. The client stores it (e.g. in cookies/local storage) and attaches it to authorization headers for subsequent REST API calls.' }
    ],
    salary: [
      { role: 'Junior MERN Developer', range: '₹4.5 - ₹7.0 LPA' },
      { role: 'Senior Full Stack Engineer', range: '₹12.0 - ₹24.0 LPA' },
      { role: 'Lead AI Engineer', range: '₹18.0 - ₹35.0 LPA' }
    ],
    jobs: [
      'Full Stack Developer',
      'Frontend React Engineer',
      'Node.js Backend Developer',
      'AI Software Systems Engineer'
    ]
  },
  'python-programming': {
    whatIs: 'Python is a high-level, interpreted programming language known for its emphasis on code readability. Its syntax allows developers to write programs in fewer lines of code than other systems, serving as the language of choice for scripting, automation, web backends, and AI pipelines.',
    roadmap: [
      'Phase 1: Language syntax basics (data types, loops, lists, dicts)',
      'Phase 2: Object-Oriented Programming (Classes, Methods, Inheritances)',
      'Phase 3: Automation scripts (directory monitoring, web scraping with bs4)',
      'Phase 4: Web backend APIs with Django or Flask frameworks',
      'Phase 5: Connecting databases (SQLite, PostgreSQL, SQLAlchemy ORMs)'
    ],
    projects: [
      { title: 'Multi-threaded Web Scraping Engine', desc: 'Scrape e-commerce listings across multiple pages concurrently, handle rate limits, and dump parsed data to flat SQL files.' },
      { title: 'Automated Financial Ledger Audit', desc: 'A scripting tool that monitors bank statements, parses transactions, categorizes expenses, and auto-generates ledger spreadsheets.' }
    ],
    interviews: [
      { q: 'What is the difference between list and tuple in Python?', a: 'Lists are mutable (can be changed after creation) and defined with brackets `[]`. Tuples are immutable (cannot be modified) and defined with parentheses `()`.' },
      { q: 'How does Python manage memory allocation?', a: 'Python uses automatic reference counting and garbage collection to deallocate objects that have zero active reference pointers.' }
    ],
    salary: [
      { role: 'Python Scripting Analyst', range: '₹4.0 - ₹6.5 LPA' },
      { role: 'Django Backend Engineer', range: '₹8.0 - ₹15.0 LPA' },
      { role: 'Automation Specialist', range: '₹6.0 - ₹12.0 LPA' }
    ],
    jobs: [
      'Python Software Developer',
      'Backend Engineer',
      'QA Automation Engineer',
      'Scraping Specialist'
    ]
  },
  'data-science-machine-learning': {
    whatIs: 'Data Science & Machine Learning combines statistics, coding, and mathematical models to uncover insights from datasets and build predictive algorithms. This track focuses on model construction, parameter tuning, deep learning, and vector search systems.',
    roadmap: [
      'Phase 1: Python statistics, NumPy arrays, and Pandas DataFrames',
      'Phase 2: Data Wrangling, cleansing operations, and feature scalings',
      'Phase 3: Machine Learning models (Regressions, Random Forests, XGBoost)',
      'Phase 4: Deep Learning layers, TensorFlow, and computer vision CNNs',
      'Phase 5: Large Language Models, prompt architectures, and RAG pipelines'
    ],
    projects: [
      { title: 'Predictive Medical Diagnostic Model', desc: 'Train deep neural layers to categorize disease types from medical parameters with high precision auditing.' },
      { title: 'Vector Search RAG Document QA Chatbot', desc: 'Build a document analysis chatbot parsing internal archives using ChromaDB, LangChain, and GPT models.' }
    ],
    interviews: [
      { q: 'Explain overfitting and how to prevent it.', a: 'Overfitting occurs when a model learns noise in training data instead of general patterns. Prevent it using cross-validation, regularization (L1/L2), pruning, or dropout layers.' },
      { q: 'What is the difference between Supervised and Unsupervised learning?', a: 'Supervised learning uses labeled training datasets (inputs with target output keys). Unsupervised learning models locate hidden patterns in unlabeled datasets.' }
    ],
    salary: [
      { role: 'Junior Data Analyst', range: '₹5.0 - ₹8.0 LPA' },
      { role: 'Machine Learning Engineer', range: '₹12.0 - ₹28.0 LPA' },
      { role: 'Data Scientist', range: '₹15.0 - ₹35.0 LPA' }
    ],
    jobs: [
      'Data Scientist',
      'Machine Learning Engineer',
      'AI Systems Architect',
      'Quantitative Model Analyst'
    ]
  },
  'graphic-design-ui-ux': {
    whatIs: 'Graphic Design and UI/UX focuses on visual storytelling and interactive product blueprints. It encompasses graphics creation using Photoshop/Illustrator, and wireframing, high-fidelity prototypes, and component design systems inside Figma.',
    roadmap: [
      'Phase 1: Visual design principles (colors, spacing, typography grids)',
      'Phase 2: Vector illustrations and assets creation (Photoshop, Illustrator)',
      'Phase 3: User research, user journey mapping, and wireframings',
      'Phase 4: Component architecture, Auto-Layout, and prototyping in Figma',
      'Phase 5: Portfolio design, client handoffs, and UI assets packaging'
    ],
    projects: [
      { title: 'SaaS Platform Interactive Design System', desc: 'A complete Figma component library with variants, dark modes, and interactive states for enterprise platforms.' },
      { title: 'Mobile Healthcare Application UX', desc: 'An end-to-end design layout of a mobile pharmacy portal following comprehensive user testing cycles.' }
    ],
    interviews: [
      { q: 'What is a Design System in Figma?', a: 'A Design System is a collection of reusable components, typography, color tokens, and layout guidelines that ensure brand consistency across products.' },
      { q: 'What is the difference between UX and UI?', a: 'UX (User Experience) is about the structural logic and user journeys. UI (User Interface) is about the visual presentation, color themes, and assets.' }
    ],
    salary: [
      { role: 'Junior UI/UX Designer', range: '₹4.0 - ₹7.0 LPA' },
      { role: 'Product Designer', range: '₹9.0 - ₹18.0 LPA' },
      { role: 'Creative Design Lead', range: '₹14.0 - ₹28.0 LPA' }
    ],
    jobs: [
      'UI/UX Designer',
      'Product Designer',
      'Visual Graphic Designer',
      'Interaction Designer'
    ]
  },
  'data-analytics': {
    whatIs: 'Data Analytics involves transforming raw transaction records into business intelligence. Using SQL query writing, Excel spreadsheets, and visual tools like Tableau and Power BI, analysts construct dashboards to back executive actions.',
    roadmap: [
      'Phase 1: Advanced Excel metrics, pivot tables, and lookup pipelines',
      'Phase 2: Relational database structures and SQL aggregations',
      'Phase 3: Interactive dashboard construction in Tableau & Power BI',
      'Phase 4: Scripting datasets and loading data pipelines using Python Pandas'
    ],
    projects: [
      { title: 'Global Retail Dashboard Pipeline', desc: 'A unified operational dashboard compiling global transactions using SQL views, PowerQuery steps, and interactive visualizations.' },
      { title: 'Customer Churn Analysis Grid', desc: 'Profile and visualize transaction anomalies and churn metrics using Power BI metrics and DAX parameters.' }
    ],
    interviews: [
      { q: 'Explain the difference between a Dimension and a Measure.', a: 'Dimensions are qualitative categories used to slice data (e.g. Region, Category). Measures are numerical metrics that can be aggregated (e.g. Revenue, Sales).' },
      { q: 'What is database normalization?', a: 'Database normalization is the structural organization of relational tables to reduce duplicate data and dependency anomalies.' }
    ],
    salary: [
      { role: 'Data Analytics Associate', range: '₹4.5 - ₹7.5 LPA' },
      { role: 'Business Intelligence Lead', range: '₹9.0 - ₹16.0 LPA' },
      { role: 'Operations Analytics Manager', range: '₹12.0 - ₹22.0 LPA' }
    ],
    jobs: [
      'Data Analyst',
      'Business Intelligence (BI) Analyst',
      'Reporting Engineer',
      'Systems Analyst'
    ]
  },
  'java-full-stack': {
    whatIs: 'Java Full Stack Development focuses on enterprise application architectures. By combining core Java, Spring Boot microservices, persistent database configurations, and React frontend templates, developers construct scalable platforms.',
    roadmap: [
      'Phase 1: Object-oriented programming, classes, collections in Java',
      'Phase 2: Database connections with JDBC and Hibernate ORM configurations',
      'Phase 3: Microservice construction using Spring Boot frameworks',
      'Phase 4: Secure authentication checks with JWT and Spring Security configurations',
      'Phase 5: React.js frontend component mapping and server deployments'
    ],
    projects: [
      { title: 'Concurrent Banking Microservices', desc: 'Secure Rest endpoints handling transactions, transfers, and persistent logging using JDBC locks.' },
      { title: 'Full Stack Learning Management System', desc: 'A learning platform backend integrated with React templates, PDF report generations, and progress logs.' }
    ],
    interviews: [
      { q: 'What is Dependency Injection in Spring Boot?', a: 'Dependency Injection is a design pattern where the Spring container automatically initializes and injects objects (beans) into client classes, decoupling them.' },
      { q: 'Explain the difference between abstract class and interface in Java.', a: 'Abstract classes can hold state variables and concrete methods. Interfaces are contracts that only declare methods (concrete default methods are allowed in Java 8+).' }
    ],
    salary: [
      { role: 'Java Enterprise Associate', range: '₹5.0 - ₹8.0 LPA' },
      { role: 'Spring Boot Backend Lead', range: '₹11.0 - ₹20.0 LPA' },
      { role: 'Full Stack Architect', range: '₹18.0 - ₹32.0 LPA' }
    ],
    jobs: [
      'Java Full Stack Developer',
      'Spring Boot Specialist',
      'Enterprise Backend Engineer',
      'Systems Software Engineer'
    ]
  },
  'cloud-devops': {
    whatIs: 'Cloud Computing & DevOps concentrates on automation and infrastructure scale. It covers hosting configurations on AWS, container orchestration via Docker and Kubernetes, and infrastructure-as-code deployments via Terraform.',
    roadmap: [
      'Phase 1: Linux system commands, shell scripting, and user network gates',
      'Phase 2: Multi-stage Docker packaging and image size optimizations',
      'Phase 3: Infrastructure orchestration on AWS (EC2, VPC, S3, IAM)',
      'Phase 4: CI/CD automation pipelines utilizing Jenkins and Git Actions',
      'Phase 5: Declarative deployments with Terraform and Kubernetes clusters'
    ],
    projects: [
      { title: 'Self-Healing Kubernetes Clusters', desc: 'Expose a microservices cluster configured with automated HPA scalers, ingress, and Prometheus metrics.' },
      { title: 'Fully Automated Terraform AWS Stack', desc: 'Launch complete web clusters on AWS utilizing Terraform configs, load balancers, and secure subnets.' }
    ],
    interviews: [
      { q: 'What is the purpose of multi-stage Docker builds?', a: 'Multi-stage builds allow you to use different base containers for build and runtime, keeping production containers tiny by stripping compilation tools.' },
      { q: 'Explain the difference between CI and CD.', a: 'CI (Continuous Integration) is about auto-testing and building on code commits. CD (Continuous Deployment) is about auto-releasing passed builds directly to servers.' }
    ],
    salary: [
      { role: 'DevOps Engineer', range: '₹6.0 - ₹12.0 LPA' },
      { role: 'Cloud Infrastructure Architect', range: '₹14.0 - ₹26.0 LPA' },
      { role: 'Site Reliability Specialist', range: '₹12.0 - ₹22.0 LPA' }
    ],
    jobs: [
      'DevOps Engineer',
      'Cloud Systems Administrator',
      'SRE (Site Reliability Engineer)',
      'Infrastructure Architect'
    ]
  },
  'digital-marketing': {
    whatIs: 'Digital Marketing with AI centers on growth hacking and digital sales. It combines Search Engine Optimization (SEO), PPC (Google/Meta Ads), and email marketing pipelines with AI tools to build conversion loops.',
    roadmap: [
      'Phase 1: SEO keyword research, on-page audits, and backlinks',
      'Phase 2: Ad campaign structures, target bidding on Google/Meta networks',
      'Phase 3: Web analytics, conversion triggers, and landing page layouts',
      'Phase 4: AI copywriting, content calendars, and programmatic emails'
    ],
    projects: [
      { title: 'Lead Generation Growth Campaign', desc: 'Set up, run, and optimize an active growth funnel returning leads with highly audited conversion metrics.' },
      { title: 'SaaS SEO Growth Sprint', desc: 'Complete keyword targeting maps, directory listings, and organic audits for a target platform.' }
    ],
    interviews: [
      { q: 'Explain on-page SEO vs off-page SEO.', a: 'On-page SEO covers keyword inclusions, title tags, page structure, and content speed. Off-page SEO covers backlinks and branding signals.' },
      { q: 'What is CTR and how do you optimize it?', a: 'CTR (Click-Through Rate) is the ratio of clicks to views. Optimize it by testing compelling titles, descriptions, and CTA overlays.' }
    ],
    salary: [
      { role: 'Digital Marketing Analyst', range: '₹3.5 - ₹6.0 LPA' },
      { role: 'Performance Marketer', range: '₹7.0 - ₹14.0 LPA' },
      { role: 'Growth Lead', range: '₹12.0 - ₹22.0 LPA' }
    ],
    jobs: [
      'SEO Specialist',
      'Performance Marketing Manager',
      'Growth Hacker',
      'Social Media Ads Specialist'
    ]
  },
  'videography-video-editing': {
    whatIs: 'Graphic Designing & Video Editing covers visual production. It maps script structures, audio mixes, asset edits in Photoshop, and multi-track edits in Premiere Pro and After Effects.',
    roadmap: [
      'Phase 1: Color theory, raster layouts, vector assets (Photoshop, Illustrator)',
      'Phase 2: Premiere Pro timeline timelines, multi-camera sequences',
      'Phase 3: Sound engineering, voice overrides, and sound effect layers',
      'Phase 4: Motion graphics, visual overlays, and typography in After Effects'
    ],
    projects: [
      { title: 'Commercial Promotion Promo Clip', desc: 'An editing sprint handling color corrections, keyframing, typography, and clean audio levels.' },
      { title: 'Explainer Video Production', desc: 'A complex explainer clip compiling vectors, character overlays, and background audio.' }
    ],
    interviews: [
      { q: 'What is color grading vs color correction?', a: 'Color correction is normalizing clips (matching white balance and contrast). Color grading is styling the look to evoke specific moods.' },
      { q: 'Explain keyframing in After Effects.', a: 'Keyframing is marking values (scale, position, opacity) at specific timestamps, allowing the engine to animate shifts smoothly in between.' }
    ],
    salary: [
      { role: 'Video Editor Specialist', range: '₹4.0 - ₹6.5 LPA' },
      { role: 'Creative Producer', range: '₹8.0 - ₹15.0 LPA' },
      { role: 'Motion Graphic Lead', range: '₹10.0 - ₹18.0 LPA' }
    ],
    jobs: [
      'Video Editor',
      'Motion Designer',
      'Content Producer',
      'Creative Design Lead'
    ]
  },
  'mlops-ai-systems': {
    whatIs: 'MLOps & AI Systems Engineering concentrates on operationalizing ML models. It covers model compilation, vLLM inference scaling, drift monitors, GPU clusters, and pipelines automation.',
    roadmap: [
      'Phase 1: ML pipelines scaling, data validation schemas',
      'Phase 2: Model registers (MLflow), version tracks',
      'Phase 3: Scaled inference hosting with Triton and vLLM',
      'Phase 4: Continuous validation, drift audits, model retrain loops'
    ],
    projects: [
      { title: 'Self-Scaling vLLM Host', desc: 'Host open-source large language models scaled using Triton inference servers on public cloud nodes.' },
      { title: 'Automated Drift Audit Pipeline', desc: 'Create drift verification routines logging database queries and alerting on parameter drifts.' }
    ],
    interviews: [
      { q: 'Explain model drift and how to audit it.', a: 'Model drift is the performance drop when real-world inputs drift from training data distributions. Audit it by running statistical checks (e.g. KS test) on input metrics.' },
      { q: 'What is Triton Inference Server?', a: 'Triton is an open-source Nvidia server optimizing model inference across multiple framework backends (PyTorch, TensorFlow, TensorRT).' }
    ],
    salary: [
      { role: 'MLOps Architect', range: '₹10.0 - ₹18.0 LPA' },
      { role: 'AI Systems Engineer', range: '₹15.0 - ₹30.0 LPA' },
      { role: 'Lead DevOps for AI', range: '₹18.0 - ₹38.0 LPA' }
    ],
    jobs: [
      'MLOps Engineer',
      'AI Infrastructure Lead',
      'Machine Learning Systems Analyst',
      'Model Deployments Architect'
    ]
  }
};
