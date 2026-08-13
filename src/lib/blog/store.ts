import fs from 'fs';
import path from 'path';
import { BlogPost, SlugRedirect } from './types';
import { POSTS } from '@/app/blog/posts';

const STORE_PATH = path.join(process.cwd(), 'src/data/blog-store.json');
const REDIRECTS_PATH = path.join(process.cwd(), 'src/data/blog-redirects.json');
const DYNAMIC_POSTS_PATH = path.join(process.cwd(), 'src/app/blog/dynamic_posts.json');

interface StoreData {
  posts: BlogPost[];
  lastUpdated: string;
}

let inMemoryPostsCache: BlogPost[] | null = null;
let inMemoryRedirectsCache: SlugRedirect[] | null = null;

// Initial migration helper to migrate static POSTS + dynamic_posts.json into the unified persistent store
function initializeStore(): BlogPost[] {
  if (fs.existsSync(STORE_PATH)) {
    try {
      const content = fs.readFileSync(STORE_PATH, 'utf8');
      const parsed: StoreData = JSON.parse(content);
      if (Array.isArray(parsed.posts) && parsed.posts.length > 0) {
        return parsed.posts;
      }
    } catch (err) {
      console.error('Error reading blog-store.json:', err);
    }
  }

  // Fallback / First-Time Migration
  let legacyDynamic: BlogPost[] = [];
  if (fs.existsSync(DYNAMIC_POSTS_PATH)) {
    try {
      const raw = fs.readFileSync(DYNAMIC_POSTS_PATH, 'utf8');
      legacyDynamic = JSON.parse(raw);
    } catch (err) {
      console.error('Error loading legacy dynamic posts:', err);
    }
  }

  // Map static POSTS into full BlogPost format
  const mappedStatic: BlogPost[] = POSTS.map((p) => ({
    id: `post-static-${p.id}`,
    slug: p.slug,
    title: p.title,
    excerpt: p.desc,
    content: p.content || p.desc,
    featuredImage: p.image,
    imageAlt: p.title,
    authorId: p.author.toLowerCase().includes('arbaaz') ? 'md-arbaaz' : 'mohd-kaunain',
    authorName: p.author,
    authorRole: 'Tech Mentor',
    category: p.category,
    tags: p.tags || ['Tech', 'Career'],
    status: 'published',
    publishedAt: new Date(p.date).toISOString(),
    updatedAt: new Date(p.date).toISOString(),
    createdAt: new Date(p.date).toISOString(),
    readingTime: p.readTime || '5 min read',
    seoTitle: `${p.title} | KodeToCareer Blog`,
    seoDescription: p.desc,
    isFeatured: p.featured || false,
    relatedCourseSlug: p.category === 'Web Development' ? 'mern-stack-development' : 'data-science-machine-learning'
  }));

  const mappedDynamic: BlogPost[] = legacyDynamic.map((p: any, idx) => ({
    id: `post-dynamic-${p.id || idx}`,
    slug: p.slug,
    title: p.title,
    excerpt: p.desc || p.excerpt || p.title,
    content: p.content || p.desc || p.title,
    featuredImage: p.image || p.featuredImage || 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=500&fit=crop',
    imageAlt: p.title,
    authorId: 'md-arbaaz',
    authorName: p.author || p.authorName || 'Md Arbaaz',
    authorRole: 'Lead Tech Instructor',
    category: p.category || 'Programming',
    tags: p.tags || ['Technology'],
    status: 'published',
    publishedAt: p.date ? new Date(p.date).toISOString() : new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    readingTime: p.readTime || p.readingTime || '5 min read',
    seoTitle: `${p.title} | KodeToCareer`,
    seoDescription: p.desc || p.excerpt || p.title,
    isFeatured: false
  }));

  // Combine and deduplicate by slug
  const slugMap = new Map<string, BlogPost>();
  [...mappedDynamic, ...mappedStatic].forEach((item) => {
    if (!slugMap.has(item.slug)) {
      slugMap.set(item.slug, item);
    }
  });

  const merged = Array.from(slugMap.values());
  savePostsToDisk(merged);
  return merged;
}

function savePostsToDisk(posts: BlogPost[]): void {
  try {
    const dir = path.dirname(STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const data: StoreData = {
      posts,
      lastUpdated: new Date().toISOString()
    };
    fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2), 'utf8');
    inMemoryPostsCache = posts;
  } catch (err) {
    console.error('Failed to write blog store to disk:', err);
  }
}

export function loadAllPosts(): BlogPost[] {
  if (inMemoryPostsCache) {
    return inMemoryPostsCache;
  }
  const posts = initializeStore();
  inMemoryPostsCache = posts;
  return posts;
}

export function saveAllPosts(posts: BlogPost[]): void {
  inMemoryPostsCache = posts;
  savePostsToDisk(posts);
}

export function loadRedirects(): SlugRedirect[] {
  if (inMemoryRedirectsCache) {
    return inMemoryRedirectsCache;
  }
  if (fs.existsSync(REDIRECTS_PATH)) {
    try {
      const raw = fs.readFileSync(REDIRECTS_PATH, 'utf8');
      inMemoryRedirectsCache = JSON.parse(raw);
      return inMemoryRedirectsCache || [];
    } catch (err) {
      console.error('Error reading blog-redirects.json:', err);
    }
  }
  inMemoryRedirectsCache = [];
  return [];
}

export function saveRedirects(redirects: SlugRedirect[]): void {
  try {
    const dir = path.dirname(REDIRECTS_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(REDIRECTS_PATH, JSON.stringify(redirects, null, 2), 'utf8');
    inMemoryRedirectsCache = redirects;
  } catch (err) {
    console.error('Failed to save redirects:', err);
  }
}
