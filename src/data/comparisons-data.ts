export interface CompareRow {
  feature: string;
  itemA: string;
  itemB: string;
}

export interface ComparisonData {
  title: string;
  slug: string;
  tagline: string;
  introduction: string; // AEO-optimized
  table: CompareRow[];
  chooseA: string[];
  chooseB: string[];
  salaryCompare: string;
  demandCompare: string;
  courseASlug: string;
  courseAName: string;
  courseBSlug: string;
  courseBName: string;
}

export const COMPARISONS_DATA: Record<string, ComparisonData> = {
  'data-science-vs-data-analytics': {
    title: 'Data Science vs Data Analytics',
    slug: 'data-science-vs-data-analytics',
    tagline: 'Compare the roles, skills, and salaries between Data Science and Data Analytics.',
    introduction: 'What is the difference between Data Science and Data Analytics? Data Science focuses on building predictive machine learning models and algorithms using statistical math, while Data Analytics focuses on cleaning historical datasets and building dashboards to extract business intelligence.',
    table: [
      { feature: 'Primary Focus', itemA: 'Predictive Modeling & ML Algorithms', itemB: 'Data Cleaning & BI Dashboarding' },
      { feature: 'Core Language', itemA: 'Python, R', itemB: 'SQL, Python' },
      { feature: 'Mathematical Depth', itemA: 'High (Probability, Linear Algebra, Stats)', itemB: 'Basic (Descriptive Statistics, Percentages)' },
      { feature: 'Primary Tools', itemA: 'Jupyter, TensorFlow, Scikit-Learn', itemB: 'Excel, Power BI, Google Looker Studio' },
      { feature: 'Average Salary', itemA: '₹9,00,000 / year', itemB: '₹6,50,000 / year' }
    ],
    chooseA: [
      'You enjoy statistical math, probability, and writing predictive algorithms.',
      'You want to train neural networks and work on AI/machine learning products.',
      'You are comfortable with higher programming complexity.'
    ],
    chooseB: [
      'You want to clean datasets and tell stories with visual chart dashboards.',
      'You want to work directly with business managers and guide commercial decisions.',
      'You want a faster learning curve with less advanced mathematics.'
    ],
    salaryCompare: 'Data Scientists generally earn 20-35% higher average salaries due to the advanced mathematical and predictive model requirements.',
    demandCompare: 'Both roles are in high demand. Data Analysts are recruited heavily by e-commerce and retail firms, while Data Scientists are in demand at AI product and tech consulting firms.',
    courseASlug: 'data-science-machine-learning',
    courseAName: 'Data Science & Machine Learning Core',
    courseBSlug: 'data-analytics',
    courseBName: 'Data Analytics & Business Intelligence'
  },
  'python-vs-java': {
    title: 'Python vs Java',
    slug: 'python-vs-java',
    tagline: 'Compare learning curves, execution speeds, and career roles for Python and Java.',
    introduction: 'What is the difference between Python and Java? Python is an interpreted, dynamically-typed language known for its clean readability and simple syntax, whereas Java is a compiled, statically-typed object-oriented language known for its execution speed and enterprise scalability.',
    table: [
      { feature: 'Type System', itemA: 'Dynamically Typed (implicit)', itemB: 'Statically Typed (explicit declarations)' },
      { feature: 'Syntax Complexity', itemA: 'Very Low (human-like)', itemB: 'Medium to High (verbose code blocks)' },
      { feature: 'Execution Speed', itemA: 'Slower (Interpreted)', itemB: 'Faster (Compiled to JVM bytecode)' },
      { feature: 'Key Domains', itemA: 'AI, Machine Learning, Automation, Scripts', itemB: 'Enterprise Banking, Android Apps, Backend Services' },
      { feature: 'Average Salary', itemA: '₹9,00,000 / year', itemB: '₹9,50,000 / year' }
    ],
    chooseA: [
      'You want to transition into data analytics, AI, or machine learning fields.',
      'You want a beginner-friendly language with clean syntax and rapid prototyping.',
      'You are interested in building automated web scrapers or scripts.'
    ],
    chooseB: [
      'You want to build secure enterprise backend services for banks or large corporations.',
      'You want to master strict object-oriented design patterns and type systems.',
      'You want to build native Android mobile applications.'
    ],
    salaryCompare: 'Java developers and Python developers earn comparable average salaries, though senior Java microservice architects often command higher backend premiums.',
    demandCompare: 'Java demand remains extremely stable across legacy corporate banking and enterprise backends. Python demand is expanding rapidly alongside AI integration.',
    courseASlug: 'python-programming',
    courseAName: 'Python Programming & Automation',
    courseBSlug: 'java-full-stack',
    courseBName: 'Java Full Stack Developer Program'
  },
  'react-vs-angular': {
    title: 'React vs Angular',
    slug: 'react-vs-angular',
    tagline: 'Compare architecture, rendering speeds, and hiring scopes for React and Angular.',
    introduction: 'What is the difference between React and Angular? React is a lightweight UI component library utilizing virtual DOM diffing and unidirectional data flow, while Angular is a comprehensive framework offering built-in routers, HTTP modules, and strict TypeScript structures.',
    table: [
      { feature: 'Core Type', itemA: 'UI Component Library', itemB: 'Full-Scale MVC Framework' },
      { feature: 'Rendering System', itemA: 'Virtual DOM (Diff reconciliation)', itemB: 'Real DOM (Incremental DOM updates)' },
      { feature: 'Data Flow', itemA: 'Unidirectional (parent to child props)', itemB: 'Bidirectional (two-way binding)' },
      { feature: 'Language Standard', itemA: 'JavaScript / JSX / TypeScript', itemB: 'Strict TypeScript' },
      { feature: 'Job Openings Ratio', itemA: 'Higher (approx 3:1 in market)', itemB: 'Stable but concentrated in enterprise' }
    ],
    chooseA: [
      'You want to learn the most popular library used by startups and modern tech firms.',
      'You prefer flexibility in choosing state libraries (Redux, Zustand) and router plugins.',
      'You want a smoother learning curve with less initial framework configuration.'
    ],
    chooseB: [
      'You are building large-scale corporate platforms with pre-enforced structural rules.',
      'You prefer a battery-included framework where routing and validation are pre-built.',
      'You enjoy strict TypeScript guidelines and modular systems.'
    ],
    salaryCompare: 'Average salaries are comparable. Senior engineers with either React or Angular mastery command premium rates, though React offers a larger volume of listings.',
    demandCompare: 'React dominates the startup and middle-market job volume. Angular is highly favored by large multi-national enterprise corporations for consistent scaling.',
    courseASlug: 'mern-stack-development',
    courseAName: 'MERN Stack Development + AI Integration',
    courseBSlug: 'java-full-stack',
    courseBName: 'Java Full Stack Developer Program'
  },
  'mern-vs-java-full-stack': {
    title: 'MERN vs Java Full Stack',
    slug: 'mern-vs-java-full-stack',
    tagline: 'Compare stacks, databases, and development speeds for MERN and Java Full Stack.',
    introduction: 'What is the difference between MERN and Java Full Stack? MERN stack relies on a unified JavaScript database ecosystem (MongoDB, Express, React, Node) prioritizing rapid development and startup scaling, whereas Java Full Stack integrates React frontend with a secure Spring Boot microservice and relational SQL databases.',
    table: [
      { feature: 'Backend Runtime', itemA: 'Node.js (Single-thread event loop)', itemB: 'JVM / Spring Boot (Multi-threaded server)' },
      { feature: 'Primary Database', itemA: 'MongoDB (NoSQL Document)', itemB: 'PostgreSQL / MySQL / Oracle (Relational SQL)' },
      { feature: 'Language Consistency', itemA: 'High (JavaScript/TypeScript on both sides)', itemB: 'Dual (JavaScript on frontend, Java on backend)' },
      { feature: 'Development Speed', itemA: 'Rapid (ideal for prototype iterations)', itemB: 'Structured (takes longer to initialize)' },
      { feature: 'Average Salary', itemA: '₹8,50,000 / year', itemB: '₹9,50,000 / year' }
    ],
    chooseA: [
      'You want to build full stack apps using a single language (JavaScript/TypeScript).',
      'You are interested in startup roles, SaaS products, and rapid app iterations.',
      'You prefer flexible, schema-less NoSQL databases.'
    ],
    chooseB: [
      'You want to target backend developer roles at financial banks, enterprise MNCs.',
      'You want to master enterprise microservice architectures and thread safety.',
      'You prefer strict relational SQL databases and explicit type safety.'
    ],
    salaryCompare: 'Java Full Stack engineers often command slightly higher initial salaries due to the complexity of enterprise backend architectures and security integrations.',
    demandCompare: 'MERN stack is extremely popular across tech startups and product-focused SaaS firms. Java Full Stack is the industry standard for banks, healthcare providers, and insurance platforms.',
    courseASlug: 'mern-stack-development',
    courseAName: 'MERN Stack Development + AI Integration',
    courseBSlug: 'java-full-stack',
    courseBName: 'Java Full Stack Developer Program'
  },
  'ui-ux-vs-graphic-design': {
    title: 'UI UX vs Graphic Design',
    slug: 'ui-ux-vs-graphic-design',
    tagline: 'Compare visual art, product metrics, and workflows for UI/UX and Graphic Design.',
    introduction: 'What is the difference between UI UX Design and Graphic Design? UI UX Design focuses on product usability, interactive prototyping, and digital user journeys inside mobile/web apps, while Graphic Design focuses on visual communication, branding illustrations, and static marketing layouts.',
    table: [
      { feature: 'Primary Goal', itemA: 'Product Usability & Conversions', itemB: 'Branding & Visual Communication' },
      { feature: 'Design Platform', itemA: 'Interactive Digital Apps (Web/Mobile)', itemB: 'Print, Web Banners, Static Marketing' },
      { feature: 'Primary Software', itemA: 'Figma, Adobe XD', itemB: 'Adobe Illustrator, Photoshop, InDesign' },
      { feature: 'Evaluation Metric', itemA: 'User retention, task completion rate', itemB: 'Brand alignment, aesthetic appeal' },
      { feature: 'Average Salary', itemA: '₹8,00,000 / year', itemB: '₹4,50,000 / year' }
    ],
    chooseA: [
      'You want to research user behavior and design interactive screen flows.',
      'You are interested in product metrics, conversions, and wireframe tests.',
      'You want to design digital layouts for startups and tech companies.'
    ],
    chooseB: [
      'You enjoy vector art, illustrations, branding assets, and logo design.',
      'You want to build marketing posters, visual brochures, and packaging layouts.',
      'You prefer creative visual art over user research and usability testing.'
    ],
    salaryCompare: 'UI/UX designers earn significantly higher average salaries than graphic designers because their work directly impacts web/mobile app conversion metrics and product retention.',
    demandCompare: 'Graphic designers are in steady demand across advertising agencies and branding firms. UI/UX designers are in high demand across tech companies scaling up digital applications.',
    courseASlug: 'graphic-design-ui-ux',
    courseAName: 'Graphic Design + UI/UX Product Design Systems',
    courseBSlug: 'videography-video-editing',
    courseBName: 'Graphic Design + Videography Course'
  },
  'coding-ninjas-vs-kodetocareer': {
    title: 'Coding Ninjas vs KodeToCareer',
    slug: 'coding-ninjas-vs-kodetocareer',
    tagline: 'Compare course structures, live mentorship, batch sizes, and placement support between Coding Ninjas and KodeToCareer.',
    introduction: 'What is the difference between Coding Ninjas and KodeToCareer? Coding Ninjas primarily offers self-paced video modules with pre-recorded video lectures and automated coding problem sets. KodeToCareer delivers 100% live instructor-led cohorts, small batch sizes (max 25 students), 1-on-1 career counseling, guaranteed paid internships, and direct recruiter referrals.',
    table: [
      { feature: 'Class Format', itemA: 'Self-Paced Recorded Videos', itemB: '100% Live Interactive Cohorts' },
      { feature: 'Batch Size', itemA: 'Large Uncapped Batches (100+)', itemB: 'Small Focused Batches (Max 25)' },
      { feature: 'Mentorship', itemA: 'Doubt Support TAs via Chat', itemB: '1-on-1 Live Senior Developer Mentors' },
      { feature: 'Practical Internships', itemA: 'Pre-recorded Projects', itemB: 'Guaranteed Live Industry Internships' },
      { feature: 'Fee Structure', itemA: 'High Upfront / Expensive ISA', itemB: 'Affordable Upfront & Transparent Pricing' }
    ],
    chooseA: [
      'You prefer learning independently through pre-recorded video modules at your own pace.',
      'You want a platform focused primarily on solving DSA problem sets.',
      'You do not require direct live instructor interaction during class hours.'
    ],
    chooseB: [
      'You learn best in live interactive classes with instant instructor doubt resolution.',
      'You want small batch sizes where your mentor knows your name and progress.',
      'You want guaranteed live industry internships and direct placement referrals in Noida / India.'
    ],
    salaryCompare: 'KodeToCareer graduates secure competitive salary packages (₹4.5 - 18 LPA) by building real production-grade AI and full-stack applications with verified internship credentials.',
    demandCompare: 'While traditional bootcamps focus heavily on competitive coding algorithms, top hiring managers increasingly demand candidates with real production projects, AI API integrations, and live internship experience.',
    courseASlug: 'mern-stack-development',
    courseAName: 'MERN Stack Development + AI Integration',
    courseBSlug: 'data-science-machine-learning',
    courseBName: 'Data Science & Machine Learning Core'
  },
  'scaler-academy-vs-kodetocareer': {
    title: 'Scaler Academy vs KodeToCareer',
    slug: 'scaler-academy-vs-kodetocareer',
    tagline: 'Compare fees, batch sizes, live mentorship, and placement assistance between Scaler Academy and KodeToCareer.',
    introduction: 'What is the difference between Scaler Academy and KodeToCareer? Scaler Academy charges ₹2.5 - 3 Lakhs for large-batch DSA and system design courses tailored primarily for software engineers with prior coding experience. KodeToCareer provides affordable 100% live cohorts, small batch sizes (max 25), beginner-to-advanced curriculum, guaranteed paid internships, and direct placement support in Noida & India.',
    table: [
      { feature: 'Course Fee', itemA: '₹2.5 Lakhs - ₹3.5 Lakhs', itemB: 'Affordable Upfront & Flexible EMI' },
      { feature: 'Target Audience', itemA: 'Experienced Engineers / Working Pros', itemB: 'Beginners, Graduates & Career Changers' },
      { feature: 'Batch Size', itemA: 'Large Batches (150+ students)', itemB: 'Focused Cohorts (Max 25 students)' },
      { feature: 'Practical Internships', itemA: 'Theoretical System Design', itemB: 'Guaranteed Live Industry Internships' },
      { feature: 'Placement Guidance', itemA: 'Job Board Referrals', itemB: '1-on-1 Mock Interviews & Direct Hiring' }
    ],
    chooseA: [
      'You are an experienced software developer preparing specifically for FAANG System Design interviews.',
      'You have a large budget (₹2.5L+) for computer science theory.',
      'You do not need foundational programming or beginner-level guidance.'
    ],
    chooseB: [
      'You want an affordable, practical bootcamp that builds real AI and web applications.',
      'You want small batch sizes where mentors review your code line-by-line.',
      'You want guaranteed paid internships and hands-on career placement assistance.'
    ],
    salaryCompare: 'KodeToCareer graduates achieve average salary packages of ₹4.5 - 18 LPA without incurring heavy student debt or expensive ISA obligations.',
    demandCompare: 'Both platforms serve tech aspiring candidates. Scaler focuses heavily on competitive DSA and system design for mid-senior engineers, while KodeToCareer excels at taking freshers and career switchers to job-ready production standards.',
    courseASlug: 'mern-stack-development',
    courseAName: 'MERN Stack Development + AI Integration',
    courseBSlug: 'java-full-stack',
    courseBName: 'Java Full Stack Developer Program'
  },
  'simplilearn-vs-kodetocareer': {
    title: 'Simplilearn vs KodeToCareer',
    slug: 'simplilearn-vs-kodetocareer',
    tagline: 'Compare self-paced certificates vs live cohort bootcamps with placement support.',
    introduction: 'What is the difference between Simplilearn and KodeToCareer? Simplilearn operates primarily as an online e-learning platform providing self-paced video modules and recorded certification courses. KodeToCareer is an intensive career academy delivering live interactive training, 15+ capstone projects, guaranteed live internships, and active 1-on-1 placement support.',
    table: [
      { feature: 'Delivery Mode', itemA: 'Pre-recorded Video Lectures', itemB: '100% Live Instructor-Led Classes' },
      { feature: 'Mentorship Access', itemA: 'Recorded Q&A Sessions', itemB: '1-on-1 Live Senior Developer Mentors' },
      { feature: 'Portfolio Projects', itemA: 'Standard Lab Assignments', itemB: '15+ Production Capstone Projects' },
      { feature: 'Internship Guarantee', itemA: 'Not Provided', itemB: 'Guaranteed Live Industry Internships' },
      { feature: 'Placement Auditing', itemA: 'General Resume Tips', itemB: '1-on-1 Mock Interviews & Recruiter Referrals' }
    ],
    chooseA: [
      'You want self-paced online video modules for passive self-study.',
      'You only need a generic certificate of completion without live interaction.',
      'You do not require active placement support or live internship experience.'
    ],
    chooseB: [
      'You want live interactive classes with instant instructor feedback.',
      'You want a verified internship experience to display on your resume.',
      'You want dedicated placement mentorship to clear job interviews.'
    ],
    salaryCompare: 'Live interactive cohort graduates consistently outperform self-paced video learners in technical interviews due to real hands-on debugging and live mock interview practice.',
    demandCompare: 'Employers prioritize candidates who have built real production-grade web applications and machine learning models over those holding passive online video certificates.',
    courseASlug: 'data-science-machine-learning',
    courseAName: 'Data Science & Machine Learning Core',
    courseBSlug: 'data-analytics',
    courseBName: 'Data Analytics & Business Intelligence'
  }
};
