export interface Tutorial {
  title: string;
  duration: string;
  level: string;
  description: string;
  steps: string[];
}

export interface LearnProject {
  title: string;
  difficulty: string;
  description: string;
  objectives: string[];
}

export interface TechHub {
  title: string;
  slug: string;
  tagline: string;
  overview: string;
  whyLearn: string[];
  tutorials: Tutorial[];
  projects: LearnProject[];
  relatedCourse: {
    name: string;
    slug: string;
    description: string;
  };
}

export const LEARN_HUBS: Record<string, TechHub> = {
  'react': {
    title: 'React',
    slug: 'react',
    tagline: 'Master components, state hooks, and high-performance virtual DOM rendering.',
    overview: 'React is the world\'s most popular frontend library for building modern user interfaces. By breaking UIs into reusable, self-contained components, React makes development predictable, modular, and fast.',
    whyLearn: [
      'Powers the frontend of modern tech firms like Netflix, Airbnb, and Facebook.',
      'Massive job market with high compensation for frontend and full-stack engineering roles.',
      'Smooth transition to mobile development using React Native.'
    ],
    tutorials: [
      {
        title: 'Component State & Props Architecture',
        duration: '15 Mins',
        level: 'Beginner',
        description: 'Understand the unidirectional data flow model of React applications, props pass-downs, and local component states.',
        steps: [
          'Declare local component states using the useState hook.',
          'Pass variables and event callbacks downwards to child elements via read-only props.',
          'Optimize state locations by lifting state up when sibling components require shared access.'
        ]
      },
      {
        title: 'Lifecycle Effects & Side Effects',
        duration: '25 Mins',
        level: 'Intermediate',
        description: 'Learn how to synchronize components with external resources, fetch server data, and audit mounting hooks.',
        steps: [
          'Utilize the useEffect hook with dependency arrays to control execution cycles.',
          'Clean up listener subscriptions and timeouts in return callbacks to prevent memory leaks.',
          'Avoid infinite rendering loops by managing state mutation triggers properly.'
        ]
      }
    ],
    projects: [
      {
        title: 'Realtime Cryptographic Pricing Dashboard',
        difficulty: 'Intermediate',
        description: 'Construct a dashboard displaying real-time cryptocurrency tickers utilizing WebSockets and state grids.',
        objectives: [
          'Establish continuous socket connections to public crypto feeds.',
          'Handle active data streams and update rendering components smoothly.',
          'Filter tickers dynamically without triggering unnecessary component updates.'
        ]
      }
    ],
    relatedCourse: {
      name: 'MERN Stack Development + AI Integration',
      slug: 'mern-stack-development',
      description: 'Go from absolute zero to advanced React, Node.js, and AI API hosting with placement backing.'
    }
  },
  'python': {
    title: 'Python',
    slug: 'python',
    tagline: 'Master automation scripting, data pipelines, web frameworks, and AI integrations.',
    overview: 'Python is a high-level, general-purpose language characterized by its clean readability. It serves as the primary backbone for Machine Learning, Data Analytics, and automated workflows globally.',
    whyLearn: [
      'The undisputed language for AI, data science, and scientific computing.',
      'Highly human-readable syntax that allows developers to write less code.',
      'Extensive library ecosystem (Pandas, NumPy, Django, TensorFlow) for immediate production deployment.'
    ],
    tutorials: [
      {
        title: 'Automating File Audits & Script Sprints',
        duration: '20 Mins',
        level: 'Beginner',
        description: 'Write Python automation scripts to parse server directories, extract log patterns, and export summaries.',
        steps: [
          'Import the os and path libraries to navigate disk directories.',
          'Read file content blocks dynamically using context-manager blocks.',
          'Parse data structures with regular expressions (re) to isolate target patterns.'
        ]
      },
      {
        title: 'Database Transactions with ORMs',
        duration: '30 Mins',
        level: 'Intermediate',
        description: 'Connect Python backends to SQL engines and execute CRUD transactions without raw query writing.',
        steps: [
          'Define database tables as Python class structures using SQLAlchemy or Django models.',
          'Open active connection sessions and execute multi-table inserts.',
          'Handle transaction rollbacks gracefully during execution failures.'
        ]
      }
    ],
    projects: [
      {
        title: 'AI PDF Document Summary Engine',
        difficulty: 'Advanced',
        description: 'Create an automation tool that monitors directories for new PDF documents, parses contents, and generates structured executive briefs.',
        objectives: [
          'Set up filesystem monitors to trigger operations on new file creation.',
          'Isolate text bodies and process paragraph streams dynamically.',
          'Integrate LLM API endpoints to produce formatted markdown summaries.'
        ]
      }
    ],
    relatedCourse: {
      name: 'Python Programming & Automation',
      slug: 'python-programming',
      description: 'Learn automation scripting, directory scraping, Django APIs, and Python database integrations.'
    }
  },
  'sql': {
    title: 'SQL',
    slug: 'sql',
    tagline: 'Write complex multi-table joins, analytic window functions, and database schemas.',
    overview: 'SQL (Structured Query Language) is the global standard language for interacting with relational databases. It allows you to organize, query, clean, and analyze gigabytes of raw records.',
    whyLearn: [
      'Fundamental skill required for every software developer, data scientist, and business analyst.',
      'Enables rapid aggregations over millions of rows of data.',
      'Highly portable across database systems like PostgreSQL, MySQL, SQL Server, and BigQuery.'
    ],
    tutorials: [
      {
        title: 'Mastering Relational Joins',
        duration: '15 Mins',
        level: 'Beginner',
        description: 'Learn to combine data across separate relational tables using different join mechanisms.',
        steps: [
          'Execute INNER JOIN to pull matching records between primary keys.',
          'Utilize LEFT JOIN to preserve all left-side records even when matching keys are absent.',
          'Combine datasets using UNION operations while auditing column alignments.'
        ]
      },
      {
        title: 'Analytic Window Functions',
        duration: '25 Mins',
        level: 'Advanced',
        description: 'Run calculations across sets of rows related to the current row without grouping the results.',
        steps: [
          'Implement ROW_NUMBER(), RANK(), and DENSE_RANK() to partition records.',
          'Compute moving averages and rolling sums using window frames (ROWS BETWEEN).',
          'Calculate lead/lag variations to compare metric shifts over chronological series.'
        ]
      }
    ],
    projects: [
      {
        title: 'E-Commerce Cohort Analysis & Metric Dashboard',
        difficulty: 'Advanced',
        description: 'Write complex SQL metrics to analyze monthly retention cohorts, customer lifespans, and average order values.',
        objectives: [
          'Group users into cohort buckets based on their registration date.',
          'Calculate transaction rates across sequential monthly offsets.',
          'Compile metrics into flat structures suitable for dashboard rendering.'
        ]
      }
    ],
    relatedCourse: {
      name: 'Data Analytics & Business Intelligence',
      slug: 'data-analytics',
      description: 'Write production-grade SQL, build interactive Power BI/Tableau dashboards, and master business pipelines.'
    }
  },
  'java': {
    title: 'Java',
    slug: 'java',
    tagline: 'Build secure, scalable, and object-oriented enterprise microservices.',
    overview: 'Java is a robust, object-oriented language that runs on billions of devices. It serves as the primary backend engineering stack for Fortune 500 banks, enterprise systems, and Android development.',
    whyLearn: [
      'Core enterprise language utilized by financial institutions, insurance systems, and logistics giants.',
      'Strongly-typed architecture that prevents runtime errors during compilation.',
      'Excellent performance, scalability, and threading capabilities through the Java Virtual Machine (JVM).'
    ],
    tutorials: [
      {
        title: 'Enterprise OOP Architecture',
        duration: '20 Mins',
        level: 'Beginner',
        description: 'Master encapsulation, inheritance patterns, interface declarations, and polymorphism in Java.',
        steps: [
          'Define abstract classes and interfaces to structure system behavior contractually.',
          'Inherit class patterns and override methods polymorphically.',
          'Protect variables using access specifiers and custom getter/setter validations.'
        ]
      },
      {
        title: 'Building Rest APIs with Spring Boot',
        duration: '35 Mins',
        level: 'Intermediate',
        description: 'Setup a Spring Boot microservice, define RestController endpoints, and connect persistent layers.',
        steps: [
          'Initialize a Maven/Gradle configuration with Spring Web dependencies.',
          'Map request URIs to Java controller methods using @GetMapping and @PostMapping.',
          'Integrate JPA repositories to automate database mapping operations.'
        ]
      }
    ],
    projects: [
      {
        title: 'Highly Scalable Banking Microservice',
        difficulty: 'Advanced',
        description: 'Implement a secure Java Spring Boot microservice handling fund transfers, account statements, and audit logging with concurrent transaction locks.',
        objectives: [
          'Design thread-safe operations to protect account balances during concurrent transfers.',
          'Expose secure REST endpoints with JWT authorization checks.',
          'Log database transaction history using Spring AOP (Aspect-Oriented Programming).'
        ]
      }
    ],
    relatedCourse: {
      name: 'Java Full Stack Developer Program',
      slug: 'java-full-stack',
      description: 'Master Core Java, Spring Boot, Hibernate, microservices, databases, and modern React hostings.'
    }
  },
  'docker': {
    title: 'Docker',
    slug: 'docker',
    tagline: 'Pack, containerize, deploy, and scale web applications consistently.',
    overview: 'Docker is an open-source platform that automates the deployment of applications inside lightweight, portable software containers. It eliminates the "works on my machine" problem entirely.',
    whyLearn: [
      'Standard devops skill needed to deploy applications to modern cloud systems (AWS, Kubernetes).',
      'Isolates dependencies to ensure applications run identically across developer laptops and production servers.',
      'Speeds up onboarding and deployment pipelines significantly.'
    ],
    tutorials: [
      {
        title: 'Writing Production Dockerfiles',
        duration: '20 Mins',
        level: 'Beginner',
        description: 'Write container specifications for Node.js or Python applications utilizing multi-stage builds to optimize image sizes.',
        steps: [
          'Specify minimal base images like Alpine to reduce footprint and security vulnerabilities.',
          'Copy dependency manifests first to leverage Docker\'s layer caching mechanism.',
          'Expose active ports and declare entrypoint commands.'
        ]
      },
      {
        title: 'Multi-Container Orchestration',
        duration: '30 Mins',
        level: 'Intermediate',
        description: 'Use Docker Compose to launch a frontend, backend, and database container simultaneously on isolated networks.',
        steps: [
          'Write a docker-compose.yml configuration declaring services and networks.',
          'Mount local folders as persistent volumes to allow hot-reloading.',
          'Establish startup sequences using depends_on rules.'
        ]
      }
    ],
    projects: [
      {
        title: 'Self-Healing Cloud App Deployment Stack',
        difficulty: 'Advanced',
        description: 'Create a multi-tier containerized stack deployed on cloud VMs with automated log collection and health check scripts.',
        objectives: [
          'Containerize separate frontend, backend, and Redis service layers.',
          'Configure Docker health checks to monitor service health status.',
          'Expose unified container logs to external log analyzers.'
        ]
      }
    ],
    relatedCourse: {
      name: 'Cloud Computing & DevOps Infrastructure',
      slug: 'cloud-devops',
      description: 'Master cloud architecture, Docker containers, Kubernetes clusters, and automated Terraform CI/CD pipelines.'
    }
  }
};
