import { BlogAuthor } from './types';

export const AUTHORS: Record<string, BlogAuthor> = {
  'md-arbaaz': {
    id: 'md-arbaaz',
    name: 'Md Arbaaz',
    role: 'Founder & Lead Tech Instructor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces',
    bio: 'Founder of KodeToCareer with 8+ years of industry experience in Full-Stack Engineering, AI Systems, and Mentoring 1200+ students.',
    linkedIn: 'https://www.linkedin.com/company/kodetocareer',
    email: 'kodetocareer@gmail.com'
  },
  'mohd-kaunain': {
    id: 'mohd-kaunain',
    name: 'Mohd Kaunain',
    role: 'Co-Founder & Lead Engineer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces',
    bio: 'Co-Founder at KodeToCareer, specializing in Next.js, Cloud Architecture, and Career Counseling for BCA/B.Tech graduates.',
    linkedIn: 'https://www.linkedin.com/company/kodetocareer'
  },
  'farhan-khan': {
    id: 'farhan-khan',
    name: 'Farhan Khan',
    role: 'Senior Full Stack Mentor',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces',
    bio: 'Senior Software Engineer specializing in MERN Stack, System Design, and Technical Interview Preparation.',
    linkedIn: 'https://www.linkedin.com/company/kodetocareer'
  },
  'ayesha-kamal': {
    id: 'ayesha-kamal',
    name: 'Ayesha Kamal',
    role: 'UI/UX & Product Mentor',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces',
    bio: 'Product Designer with deep expertise in Design Systems, User Research, and Modern Web Interface Architecture.',
    linkedIn: 'https://www.linkedin.com/company/kodetocareer'
  },
  'md-faiz': {
    id: 'md-faiz',
    name: 'Md Faiz',
    role: 'Career & Placement Director',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces',
    bio: 'Director of Career Services at KodeToCareer, connecting tech talent with 500+ corporate hiring partners across India.',
    linkedIn: 'https://www.linkedin.com/company/kodetocareer'
  }
};

export const DEFAULT_AUTHOR = AUTHORS['md-arbaaz'];

export function getAuthorById(id: string): BlogAuthor {
  return AUTHORS[id] || {
    id,
    name: id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    role: 'Technical Mentor at KodeToCareer',
    avatar: DEFAULT_AUTHOR.avatar,
    bio: 'Technical instructor and career mentor at KodeToCareer.'
  };
}
