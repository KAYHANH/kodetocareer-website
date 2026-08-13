export type BlogStatus = 'draft' | 'scheduled' | 'published' | 'archived';

export interface BlogAuthor {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  linkedIn?: string;
  email?: string;
}

export type BlogCategory = 
  | 'AI' 
  | 'Programming' 
  | 'Career' 
  | 'Interview' 
  | 'Data Science' 
  | 'Web Development' 
  | 'Placement'
  | 'DevOps'
  | 'Python'
  | 'MERN';

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  imageAlt?: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  authorRole?: string;
  category: string;
  tags: string[];
  status: BlogStatus;
  publishedAt: string;
  updatedAt: string;
  createdAt: string;
  readingTime: string;
  seoTitle: string;
  seoDescription: string;
  canonicalUrl?: string;
  ogImage?: string;
  isFeatured: boolean;
  isPinned?: boolean;
  relatedCourseSlug?: string;
  faqs?: BlogFAQ[];
  oldSlugs?: string[];
}

export interface SlugRedirect {
  oldSlug: string;
  newSlug: string;
  createdAt: string;
}

export interface BlogFilterOptions {
  status?: BlogStatus | 'all';
  category?: string;
  tag?: string;
  search?: string;
  authorId?: string;
  page?: number;
  limit?: number;
  featuredOnly?: boolean;
}

export interface BlogQueryResult {
  posts: BlogPost[];
  total: number;
  page: number;
  totalPages: number;
  categories: string[];
  popularTags: string[];
}
