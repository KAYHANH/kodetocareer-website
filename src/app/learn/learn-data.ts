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
  },
  'node': {
    title: 'Node.js',
    slug: 'node',
    tagline: 'Build fast, scalable network applications using JavaScript on the server.',
    overview: 'What is Node.js? Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside a web browser, enabling backend server development. It uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.',
    whyLearn: [
      'Allows you to write full stack applications using JavaScript on both client and server.',
      'Extremely high performance for real-time web applications (chat, streaming, gaming).',
      'Supported by npm, the largest package manager and open-source library ecosystem in the world.'
    ],
    tutorials: [
      {
        title: 'HTTP Servers & Routing',
        duration: '20 Mins',
        level: 'Beginner',
        description: 'Understand Node\'s core HTTP module, process requests, send responses, and handle URL routing.',
        steps: [
          'Use require("http") to spin up a local development web server.',
          'Read URL pathways and method verbs to route client requests.',
          'Format and return HTML or JSON content blocks with correct status codes.'
        ]
      }
    ],
    projects: [
      {
        title: 'Real-time Chat Server API',
        difficulty: 'Intermediate',
        description: 'Design a local Node.js API with custom routers, file system audit loggers, and connection managers.',
        objectives: [
          'Implement event listeners coordinating stream reading operations.',
          'Write custom routing logic to parse dynamic payloads.',
          'Save audit logs asynchronously to the local file system.'
        ]
      }
    ],
    relatedCourse: {
      name: 'MERN Stack Development + AI Integration',
      slug: 'mern-stack-development',
      description: 'Go from absolute zero to advanced React, Node.js, and AI API hosting with placement backing.'
    }
  },
  'power-bi': {
    title: 'Power BI',
    slug: 'power-bi',
    tagline: 'Create interactive dashboards and convert data into actionable business intelligence.',
    overview: 'What is Power BI? Power BI is a business analytics service by Microsoft that provides interactive visualizations and business intelligence capabilities with an interface simple enough for end users. It allows you to connect to hundreds of data sources and simplify data preparation.',
    whyLearn: [
      'The leading tool in the market for business intelligence and data visualization.',
      'Enables non-technical stakeholders to understand complex business metrics instantly.',
      'Integrates seamlessly with Excel, Azure, SQL Server, and other corporate data warehouses.'
    ],
    tutorials: [
      {
        title: 'Data Modeling & DAX Formulas',
        duration: '25 Mins',
        level: 'Beginner',
        description: 'Import data, define relationships, and write custom DAX expressions for business intelligence.',
        steps: [
          'Clean and shape data using Power Query Editor.',
          'Establish one-to-many relationship models between data tables.',
          'Write custom metrics using DAX formulas (CALCULATE, SUM, RELATED).'
        ]
      }
    ],
    projects: [
      {
        title: 'Corporate Sales & Profitability Dashboard',
        difficulty: 'Intermediate',
        description: 'Build an interactive dashboard showcasing monthly sales performance, cohort retention, and product category trends.',
        objectives: [
          'Connect to a SQL database containing raw sales tables.',
          'Design interactive filtering visualizations (slicers) for region and dates.',
          'Expose KPI metrics comparing monthly profit margins.'
        ]
      }
    ],
    relatedCourse: {
      name: 'Data Analytics & Business Intelligence',
      slug: 'data-analytics',
      description: 'Master advanced SQL, Excel, Power BI dashboards, and Python data analysis with interview training.'
    }
  },
  'mongodb': {
    title: 'MongoDB',
    slug: 'mongodb',
    tagline: 'Master modern NoSQL document databases for high-speed dynamic scaling.',
    overview: 'What is MongoDB? MongoDB is a source-available, cross-platform, document-oriented NoSQL database program that uses JSON-like documents with optional schemas. It is designed for developer productivity, flexible data modeling, and high scalability.',
    whyLearn: [
      'The database choice of MERN developers for storing application collections.',
      'No complex SQL table joins needed — data is stored naturally in readable documents.',
      'Supports horizontal scaling via sharding and replication out-of-the-box.'
    ],
    tutorials: [
      {
        title: 'CRUD Operations & Schemas',
        duration: '15 Mins',
        level: 'Beginner',
        description: 'Learn to write MongoDB queries, insert records, filter collections, and use Mongoose validation.',
        steps: [
          'Connect to local or Atlas MongoDB instances from Node.js.',
          'Perform insert, find, update, and delete operations on database collections.',
          'Define Mongoose schema fields with strict type validations.'
        ]
      }
    ],
    projects: [
      {
        title: 'Custom Content Management Database',
        difficulty: 'Intermediate',
        description: 'Model a relational blog database schema with authors, comments, and post tags, optimizing read performance.',
        objectives: [
          'Design embedded vs. referenced document data structures.',
          'Enforce strict index constraints on email and username values.',
          'Wrote optimized projection queries returning subset data.'
        ]
      }
    ],
    relatedCourse: {
      name: 'MERN Stack Development + AI Integration',
      slug: 'mern-stack-development',
      description: 'Go from absolute zero to advanced React, Node.js, and AI API hosting with placement backing.'
    }
  },
  'git': {
    title: 'Git & GitHub',
    slug: 'git',
    tagline: 'Track code changes, coordinate with teams, and host repositories.',
    overview: 'What is Git? Git is a distributed version control system that tracks changes in software source code during development, allowing multiple developers to coordinate work. GitHub is the cloud platform hosting these code repositories.',
    whyLearn: [
      'Essential baseline skill for every developer role in the modern software industry.',
      'Keeps complete historical records of code changes, enabling instant bug reverts.',
      'Enables collaborative developer flows using pull requests and code reviews.'
    ],
    tutorials: [
      {
        title: 'Branching & Merge Conflict Resolution',
        duration: '20 Mins',
        level: 'Beginner',
        description: 'Create code branches, merge feature work, and handle merge conflicts in Git.',
        steps: [
          'Create and switch branches using git checkout -b or git switch.',
          'Understand git commit history and push code commits to remote repositories.',
          'Resolve file conflicts manually and complete merges.'
        ]
      }
    ],
    projects: [
      {
        title: 'Collaborative Open Source Pipeline',
        difficulty: 'Intermediate',
        description: 'Simulate team development workflows: branch features, write code commits, and submit review pull requests.',
        objectives: [
          'Fork and clone public repositories to local development workspaces.',
          'Coordinate branch merges with master branch rules.',
          'Deploy code changes using automated GitHub actions pipelines.'
        ]
      }
    ],
    relatedCourse: {
      name: 'Enterprise Java Full Stack Developer',
      slug: 'java-full-stack',
      description: 'Master Core Java, Spring Boot, Hibernate, microservices, databases, and modern React hostings.'
    }
  },
  'css': {
    title: 'CSS & Tailwind',
    slug: 'css',
    tagline: 'Create beautiful, responsive layout designs using Tailwind and raw CSS variables.',
    overview: 'What is CSS? Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language like HTML. Tailwind CSS is a utility-first CSS framework that speeds up styling workflows.',
    whyLearn: [
      'Enables you to transform raw HTML layouts into beautiful, responsive web pages.',
      'Tailwind CSS lets you style components directly inside JSX without writing raw CSS files.',
      'Highly valued skill for crafting pixel-perfect interfaces that match Figma designs.'
    ],
    tutorials: [
      {
        title: 'Responsive Flexbox & Grid Layouts',
        duration: '15 Mins',
        level: 'Beginner',
        description: 'Learn how to create responsive layouts that shift cleanly between mobile and desktop using CSS grids.',
        steps: [
          'Define rows and columns using CSS grid-template-columns.',
          'Center items both vertically and horizontally using Flexbox rules.',
          'Use Tailwind breakpoint prefixes (sm:, md:, lg:) to adapt UI components.'
        ]
      }
    ],
    projects: [
      {
        title: 'Responsive Glassmorphic Portfolio Landing',
        difficulty: 'Intermediate',
        description: 'Design a pixel-perfect, responsive developer landing page featuring glassmorphism and hover animations.',
        objectives: [
          'Apply custom backdrop blur styles to create premium glass layers.',
          'Enforce responsive grids shifting columns based on screen width.',
          'Animate hover state transitions using CSS transition rules.'
        ]
      }
    ],
    relatedCourse: {
      name: 'Graphic Design + UI/UX Product Design Systems',
      slug: 'graphic-design-ui-ux',
      description: 'Master vector illustrations, design guidelines, accessible color choices, and interactive Figma prototyping.'
    }
  }
};
