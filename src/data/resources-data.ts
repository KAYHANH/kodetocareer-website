export interface InterviewQna {
  q: string;
  a: string;
}

export interface InterviewResource {
  title: string;
  slug: string;
  category: string;
  tagline: string;
  introduction: string; // AEO-optimized introduction
  questions: InterviewQna[];
}

export interface CareerGuide {
  title: string;
  slug: string;
  tagline: string;
  introduction: string; // AEO-optimized
  roles: string[];
  skillsRequired: string[];
  roadmapSteps: string[];
}

export interface SalaryGuide {
  title: string;
  slug: string;
  tagline: string;
  introduction: string; // AEO-optimized
  averageSalary: string;
  experienceBands: { level: string; salary: string }[];
  marketDemand: string;
}

export const INTERVIEW_RESOURCES: Record<string, InterviewResource> = {
  'react-interview-questions': {
    title: 'React Interview Questions',
    slug: 'react-interview-questions',
    category: 'Development',
    tagline: 'Top interview questions and answers to clear senior and frontend developer roles.',
    introduction: 'What is React? React is a JavaScript library used to build interactive user interfaces for web applications. These React interview questions cover essential state behaviors, virtual DOM rendering, and hook optimizations.',
    questions: [
      {
        q: 'What is the Virtual DOM and how does React use it?',
        a: 'The Virtual DOM is a lightweight, in-memory representation of the real DOM. When component state changes, React updates the Virtual DOM first, runs a diffing algorithm (Reconciliation) to identify changed elements, and batch updates only those elements in the real DOM, optimizing render performance.'
      },
      {
        q: 'Explain the difference between useEffect with and without dependency arrays.',
        a: 'useEffect without a dependency array executes after every render cycle. useEffect with an empty array `[]` runs once after the component mounts, mimicking componentDidMount. useEffect with variables in the dependency array runs only when those specific variables mutate.'
      },
      {
        q: 'What are React Hooks and why were they introduced?',
        a: 'React Hooks are special functions introduced in React 16.8 that allow functional components to manage local state, use lifecycle methods, and handle side effects. They resolve code sharing issues, eliminate the need for ES6 class syntax, and reduce component nesting.'
      }
    ]
  },
  'java-interview-questions': {
    title: 'Java Interview Questions',
    slug: 'java-interview-questions',
    category: 'Development',
    tagline: 'Crack enterprise Java, Spring Boot microservices, and OOP architectural questions.',
    introduction: 'What is Java? Java is a high-level, class-based, object-oriented programming language designed to have as few implementation dependencies as possible. These interview questions help developers clear Spring Boot and backend engineering rounds.',
    questions: [
      {
        q: 'Explain the four core principles of Object-Oriented Programming (OOP) in Java.',
        a: 'The four pillars are: 1. Encapsulation (hiding data using private variables and getters/setters), 2. Inheritance (subclasses inheriting properties using extends), 3. Polymorphism (overloading methods statically or overriding them dynamically), and 4. Abstraction (hiding implementation using abstract classes and interfaces).'
      },
      {
        q: 'What is the difference between an Abstract Class and an Interface in Java?',
        a: 'An Abstract Class can have both abstract and concrete methods, declare instance variables, and support single inheritance. An Interface contains only abstract methods (until Java 8 default methods), does not declare instance variables, and supports multiple inheritance.'
      },
      {
        q: 'How does Spring Boot differ from Spring Framework?',
        a: 'Spring Framework requires extensive XML or Java configurations to initialize databases and security layers. Spring Boot automates this setup using auto-configuration, opinionated dependency starters, and embedded web servers like Tomcat.'
      }
    ]
  },
  'sql-interview-questions': {
    title: 'SQL Interview Questions',
    slug: 'sql-interview-questions',
    category: 'Data & Analytics',
    tagline: 'Master database query joins, subqueries, group calculations, and index optimization.',
    introduction: 'What is SQL? Structured Query Language (SQL) is a standardized programming language used to manage relational databases and perform data manipulation operations. These SQL interview questions target data analyst and engineer queries.',
    questions: [
      {
        q: 'What is the difference between INNER JOIN, LEFT JOIN, and RIGHT JOIN?',
        a: 'INNER JOIN returns records matching in both tables. LEFT JOIN returns all records from the left table and matching records from the right table (with nulls for mismatches). RIGHT JOIN returns all records from the right table and matching records from the left.'
      },
      {
        q: 'Explain the difference between WHERE and HAVING clauses.',
        a: 'WHERE filters individual row records before any aggregation (GROUP BY) calculations occur. HAVING filters grouped rows after aggregation calculations have been processed.'
      },
      {
        q: 'What is an Index in SQL and how does it speed up queries?',
        a: 'An Index is a database data structure (typically a B-Tree) that enables rapid row lookups. Instead of performing full table scans, the query planner searches the index file to locate row addresses instantly, reducing read operations.'
      }
    ]
  },
  'python-interview-questions': {
    title: 'Python Interview Questions',
    slug: 'python-interview-questions',
    category: 'Data & Analytics',
    tagline: 'Crack data structures, automation routing, and machine learning script questions.',
    introduction: 'What is Python? Python is a high-level, general-purpose, interpreted programming language known for its emphasis on code readability. These Python interview questions cover lists, generators, memory management, and OOP.',
    questions: [
      {
        q: 'What is the difference between Lists and Tuples in Python?',
        a: 'Lists are mutable data structures defined with square brackets `[]`, allowing item additions or updates. Tuples are immutable sequences declared with parentheses `()`, meaning their items cannot be modified after declaration.'
      },
      {
        q: 'What are Generators in Python and when should you use them?',
        a: 'Generators are functions returning lazy-evaluating iterators using the `yield` statement. Unlike lists, they do not load the entire sequence into RAM, making them ideal for processing massive data streams and files efficiently.'
      },
      {
        q: 'How does Python handle memory management?',
        a: 'Python manages memory automatically using a private heap memory layout. It relies on reference counting to track object instances and a built-in garbage collector to resolve reference cycles and free up unused memory.'
      }
    ]
  },
  'hr-interview-questions': {
    title: 'HR Interview Questions',
    slug: 'hr-interview-questions',
    category: 'Career Support',
    tagline: 'Clear cultural behavioral checks, salary negotiations, and situation rounds.',
    introduction: 'What is an HR interview? An HR interview is a recruitment round assessing a candidate\'s cultural fit, communication skills, background verification, and salary alignment. These HR interview questions prepare you for behavioral scenarios.',
    questions: [
      {
        q: 'How do you handle conflict or differences of opinion within a developer team?',
        a: 'I resolve conflicts by listening to different perspectives, focusing on data and architectural constraints rather than personal opinions, and aligning on compromises that serve the project milestones and business goals.'
      },
      {
        q: 'Where do you see yourself in five years?',
        a: 'Over the next five years, I aim to master full stack engineering, take ownership of complex production microservices, and transition into a tech lead role where I can mentor junior engineers and coordinate system design.'
      },
      {
        q: 'Why should we hire you for this engineering role?',
        a: 'You should hire me because I bring hands-on experience building production-grade projects like my AI mock interviewer platform, deep familiarity with the MERN stack, and a proven ability to learn new tools and resolve technical bugs quickly.'
      }
    ]
  }
};

export const CAREER_GUIDES: Record<string, CareerGuide> = {
  'become-mern-developer': {
    title: 'Become MERN Developer',
    slug: 'become-mern-developer',
    tagline: 'Complete career path detailing how to become a professional MERN stack engineer.',
    introduction: 'What is a MERN Developer? A MERN developer is a full-stack software engineer specializing in Mongo DB, Express, React, and Node.js. They design user interfaces, implement server routing, and structure database collections.',
    roles: ['Frontend Developer', 'Backend Developer', 'MERN Stack Engineer', 'Full Stack Developer'],
    skillsRequired: ['JavaScript/TypeScript', 'React & State Hooks', 'Node.js & Express APIs', 'MongoDB Schemas', 'REST APIs & WebSockets'],
    roadmapSteps: [
      'Master HTML5, CSS3, and JavaScript syntax.',
      'Learn React components, state hooks, and virtual DOM diffing.',
      'Build backend servers using Node.js, Express routing, and middleware.',
      'Connect databases using MongoDB collections and Mongoose models.',
      'Create and deploy production-grade full stack capstone projects.'
    ]
  },
  'become-data-analyst': {
    title: 'Become Data Analyst',
    slug: 'become-data-analyst',
    tagline: 'Learn how to extract data insights, build dashboards, and advise business operations.',
    introduction: 'What is a Data Analyst? A data analyst is a business intelligence specialist who cleans raw data streams, writes SQL database queries, and builds interactive dashboards to help managers make data-driven decisions.',
    roles: ['Data Analyst', 'Business Intelligence Analyst', 'SQL Developer', 'Reporting Engineer'],
    skillsRequired: ['SQL Queries & Joins', 'Excel Data Modeling', 'Power BI & Looker Studio', 'Python Data Cleaning (Pandas)', 'Data Visualization Rules'],
    roadmapSteps: [
      'Master SQL queries, table joins, aggregations, and window functions.',
      'Learn Excel data shaping, Pivot tables, and statistical formulas.',
      'Build interactive dashboards using Microsoft Power BI or Looker Studio.',
      'Learn basic Python scripting using Pandas and NumPy to clean raw files.',
      'Create portfolio reports explaining business metrics and retention rates.'
    ]
  },
  'become-data-scientist': {
    title: 'Become Data Scientist',
    slug: 'become-data-scientist',
    tagline: 'Master statistical models, machine learning pipelines, and predictive algorithms.',
    introduction: 'What is a Data Scientist? A data scientist is an AI specialist who designs machine learning models, writes predictive algorithms in Python, and utilizes statistical calculations to extract indicators from massive datasets.',
    roles: ['Data Scientist', 'Machine Learning Engineer', 'AI Research Scientist', 'Predictive Analyst'],
    skillsRequired: ['Python Programming', 'Machine Learning (Scikit-Learn)', 'Deep Learning (TensorFlow/PyTorch)', 'Statistical Math & Probability', 'SQL Databases'],
    roadmapSteps: [
      'Master Python programming, Pandas dataframes, and SQL databases.',
      'Learn statistical math, hypothesis testing, and regression models.',
      'Build machine learning algorithms using Scikit-Learn (classification, clustering).',
      'Learn neural networks and deep learning computer vision with TensorFlow.',
      'Deploy models as live web APIs and write technical case study reports.'
    ]
  },
  'become-java-developer': {
    title: 'Become Java Developer',
    slug: 'become-java-developer',
    tagline: 'Career pathway for enterprise back-end and Spring Boot microservice developers.',
    introduction: 'What is a Java Developer? A Java developer is a backend engineer specializing in the Java ecosystem. They build enterprise applications, secure financial transaction engines, and coordinate microservice routers.',
    roles: ['Java Developer', 'Backend Software Engineer', 'Spring Boot Developer', 'Enterprise Java Architect'],
    skillsRequired: ['Java OOP Concepts', 'Spring Boot Framework', 'REST API Architecture', 'PostgreSQL/MySQL', 'Docker Containers'],
    roadmapSteps: [
      'Master Java programming, object-oriented concepts, and data structures.',
      'Learn JDBC database connections and SQL data structures.',
      'Build enterprise APIs using Spring Boot, JPA repository, and Spring Security.',
      'Learn containerization with Docker and deploy services on cloud servers.',
      'Design microservices using message queues and REST API routers.'
    ]
  },
  'become-ui-designer': {
    title: 'Become UI/UX Designer',
    slug: 'become-ui-designer',
    tagline: 'Path to mastering wireframes, high-fidelity mockups, and responsive design systems.',
    introduction: 'What is a UI/UX Designer? A UI/UX designer is a product designer who researches user behavior, drafts wireframe user flows, and builds pixel-perfect visual mockups and clickable prototypes in Figma.',
    roles: ['UI Designer', 'UX Researcher', 'Product Designer', 'Interaction Designer'],
    skillsRequired: ['Figma Tooling', 'User Research Methodologies', 'Typography & Visual Hierarchy', 'Interactive Prototyping', 'Responsive Design Systems'],
    roadmapSteps: [
      'Learn user research, user journey mapping, and wireframe sketching.',
      'Master Figma vector graphics, components, and auto-layouts.',
      'Design accessible color palettes and typography scales.',
      'Build interactive clickable prototypes demonstrating screen transitions.',
      'Publish high-fidelity mobile and desktop product case studies.'
    ]
  },
  'become-devops-engineer': {
    title: 'Become DevOps Engineer',
    slug: 'become-devops-engineer',
    tagline: 'Master cloud hosting, Docker containers, Kubernetes clusters, and CI/CD pipelines.',
    introduction: 'What is a DevOps Engineer? A DevOps engineer is an infrastructure specialist who automates software deployment pipelines, configures cloud servers, and manages server clusters using Docker and Kubernetes.',
    roles: ['DevOps Engineer', 'Cloud Infrastructure Engineer', 'SRE (Site Reliability Engineer)', 'CI/CD Engineer'],
    skillsRequired: ['Docker Containerization', 'Kubernetes Orchestration', 'Linux Commands & Bash Scripting', 'Terraform IaC', 'CI/CD Pipelines (GitHub Actions)'],
    roadmapSteps: [
      'Master Linux terminal operations, bash scripting, and networking rules.',
      'Learn containerizing applications using Dockerfiles.',
      'Orchestrate container clusters using Kubernetes pods and services.',
      'Write Terraform files to provision AWS/Google Cloud infrastructure.',
      'Configure automated CI/CD pipelines linking GitHub commits to live cloud deploys.'
    ]
  }
};

export const SALARY_GUIDES: Record<string, SalaryGuide> = {
  'mern-developer-salary': {
    title: 'MERN Developer Salary Guide',
    slug: 'mern-developer-salary',
    tagline: 'Complete salary breakdown for MERN stack and full-stack JavaScript developers.',
    introduction: 'What is the average salary of a MERN developer? The average salary of a MERN developer in India ranges from ₹4,50,000 to ₹18,00,000 per year, depending on their technical experience, portfolio projects, and city.',
    averageSalary: '₹8,50,000 / year',
    experienceBands: [
      { level: 'Entry-Level (0-2 Years)', salary: '₹4,00,000 – ₹7,00,000' },
      { level: 'Mid-Level (2-5 Years)', salary: '₹7,50,000 – ₹12,00,000' },
      { level: 'Senior Developer (5+ Years)', salary: '₹12,50,000 – ₹22,00,000+' }
    ],
    marketDemand: 'High. Startups and enterprise firms actively recruit JavaScript full-stack engineers to build responsive web products quickly.'
  },
  'python-developer-salary': {
    title: 'Python Developer Salary Guide',
    slug: 'python-developer-salary',
    tagline: 'Salary statistics and target compensation for Python and automation developers.',
    introduction: 'What is the average salary of a Python developer? The average salary of a Python developer ranges from ₹5,00,000 to ₹16,50,000 per year, driven by the massive expansion of machine learning, automation, and backend frameworks.',
    averageSalary: '₹9,00,000 / year',
    experienceBands: [
      { level: 'Entry-Level (0-2 Years)', salary: '₹4,50,000 – ₹7,50,000' },
      { level: 'Mid-Level (2-5 Years)', salary: '₹8,00,000 – ₹13,00,000' },
      { level: 'Senior Developer (5+ Years)', salary: '₹14,00,000 – ₹25,00,000+' }
    ],
    marketDemand: 'Extremely High. Python skills are mandatory across AI engineering, financial data modeling, and devops automation teams.'
  },
  'java-developer-salary': {
    title: 'Java Developer Salary Guide',
    slug: 'java-developer-salary',
    tagline: 'Check salary bands for Spring Boot backend and corporate Java developers.',
    introduction: 'What is the average salary of a Java developer? The average salary of a Java developer ranges from ₹5,50,000 to ₹18,50,000 per year. Corporate banks, healthcare platforms, and logistics firms pay premium rates for backend stability.',
    averageSalary: '₹9,50,000 / year',
    experienceBands: [
      { level: 'Entry-Level (0-2 Years)', salary: '₹5,00,000 – ₹8,00,000' },
      { level: 'Mid-Level (2-5 Years)', salary: '₹8,50,000 – ₹14,00,000' },
      { level: 'Senior Developer (5+ Years)', salary: '₹14,50,000 – ₹26,00,000+' }
    ],
    marketDemand: 'Stable. Multi-national corporations and financial institutions rely on Java backend microservices, ensuring continuous demand.'
  },
  'cloud-engineer-salary': {
    title: 'Cloud & DevOps Engineer Salary Guide',
    slug: 'cloud-engineer-salary',
    tagline: 'Find salary metrics for DevOps, SRE, and cloud infrastructure engineers.',
    introduction: 'What is the average salary of a DevOps engineer? The average salary of a cloud DevOps engineer in India ranges from ₹6,50,000 to ₹22,00,000 per year, reflecting the highly specialized nature of container and cloud provisioning.',
    averageSalary: '₹12,00,000 / year',
    experienceBands: [
      { level: 'Entry-Level (0-2 Years)', salary: '₹6,00,000 – ₹9,00,000' },
      { level: 'Mid-Level (2-5 Years)', salary: '₹9,50,000 – ₹16,00,000' },
      { level: 'Senior Engineer (5+ Years)', salary: '₹17,00,000 – ₹32,00,000+' }
    ],
    marketDemand: 'Critical. Companies migrating to cloud architecture (AWS, Google Cloud) require devops engineers to manage infrastructure and reduce hosting bills.'
  },
  'data-analyst-salary': {
    title: 'Data Analyst Salary Guide',
    slug: 'data-analyst-salary',
    tagline: 'Look up compensation figures for Business Intelligence and SQL analysts.',
    introduction: 'What is the average salary of a data analyst? The average salary of a data analyst ranges from ₹4,00,000 to ₹12,50,000 per year, driven by the corporate need to clean and translate database records into commercial decisions.',
    averageSalary: '₹6,50,000 / year',
    experienceBands: [
      { level: 'Entry-Level (0-2 Years)', salary: '₹3,50,000 – ₹5,50,000' },
      { level: 'Mid-Level (2-5 Years)', salary: '₹6,00,000 – ₹10,00,000' },
      { level: 'Senior Analyst (5+ Years)', salary: '₹10,50,500 – ₹18,00,000+' }
    ],
    marketDemand: 'Very High. E-commerce platforms, retail corporations, and financial consulting firms recruit analysts to build BI dashboards.'
  }
};
