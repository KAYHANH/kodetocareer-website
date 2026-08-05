export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { label: "Courses", href: "/courses" },
  { label: "Placements", href: "/placements" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Resources", href: "/resources" },
  { label: "Free Tools", href: "/free-tools", badge: "AI" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_POPULAR_COURSES: NavItem[] = [
  { label: "MERN Stack Development", href: "/courses/mern-stack-development" },
  { label: "Python & Machine Learning", href: "/courses/python-programming" },
  { label: "Data Science & AI", href: "/courses/data-science-machine-learning" },
  { label: "Data Analytics", href: "/courses/data-analytics" },
  { label: "Java Full Stack", href: "/courses/java-full-stack" },
  { label: "Cloud & DevOps", href: "/courses/cloud-devops" },
];

export const FOOTER_RESOURCES: NavItem[] = [
  { label: "Free Resume Grader", href: "/free-tools/resume-grader" },
  { label: "AI Mock Interviewer", href: "/free-tools/mock-interview" },
  { label: "SQL Cheat Sheet", href: "/learn/sql" },
  { label: "Student Projects", href: "/projects" },
  { label: "Verify Certificate", href: "/verify" },
];
