import { BlogPost, BlogFilterOptions, BlogQueryResult, BlogStatus, SlugRedirect } from './types';
import { loadAllPosts, saveAllPosts, loadRedirects, saveRedirects } from './store';
import { getAuthorById, DEFAULT_AUTHOR } from './authors';

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  return `${minutes} min read`;
}

export function getPosts(options: BlogFilterOptions = {}): BlogQueryResult {
  const allPosts = loadAllPosts();
  const {
    status = 'published',
    category = 'All',
    tag,
    search,
    authorId,
    page = 1,
    limit = 10,
    featuredOnly = false
  } = options;

  let filtered = allPosts.filter((post) => {
    // Status Filter
    if (status !== 'all') {
      if (post.status !== status) return false;
    }

    // Category Filter
    if (category && category !== 'All') {
      if (post.category.toLowerCase() !== category.toLowerCase()) return false;
    }

    // Tag Filter
    if (tag) {
      if (!post.tags || !post.tags.some(t => t.toLowerCase() === tag.toLowerCase())) {
        return false;
      }
    }

    // Author Filter
    if (authorId) {
      if (post.authorId !== authorId) return false;
    }

    // Featured Filter
    if (featuredOnly && !post.isFeatured) {
      return false;
    }

    // Search Query
    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      const matchesTitle = post.title.toLowerCase().includes(q);
      const matchesExcerpt = post.excerpt.toLowerCase().includes(q);
      const matchesAuthor = post.authorName.toLowerCase().includes(q);
      const matchesCategory = post.category.toLowerCase().includes(q);
      const matchesContent = post.content ? post.content.toLowerCase().includes(q) : false;
      const matchesTags = post.tags ? post.tags.some(t => t.toLowerCase().includes(q)) : false;

      if (!matchesTitle && !matchesExcerpt && !matchesAuthor && !matchesCategory && !matchesContent && !matchesTags) {
        return false;
      }
    }

    return true;
  });

  // Sort by publishedAt / createdAt descending
  filtered.sort((a, b) => {
    const timeA = new Date(a.publishedAt || a.createdAt).getTime();
    const timeB = new Date(b.publishedAt || b.createdAt).getTime();
    return timeB - timeA;
  });

  // Unique Categories & Tags
  const categoriesSet = new Set<string>(['All']);
  const tagsMap = new Map<string, number>();

  allPosts.forEach((p) => {
    if (p.status === 'published' || status === 'all') {
      categoriesSet.add(p.category);
      if (p.tags) {
        p.tags.forEach(t => tagsMap.set(t, (tagsMap.get(t) || 0) + 1));
      }
    }
  });

  const popularTags = Array.from(tagsMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([t]) => t);

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const startIdx = (page - 1) * limit;
  const paginatedPosts = filtered.slice(startIdx, startIdx + limit);

  return {
    posts: paginatedPosts,
    total,
    page,
    totalPages,
    categories: Array.from(categoriesSet),
    popularTags
  };
}

export function getPostBySlug(slug: string, options: { allowDrafts?: boolean } = {}): { post: BlogPost | null; redirectTo?: string } {
  const allPosts = loadAllPosts();
  const lowerSlug = slug.toLowerCase().trim();

  // Check direct slug match
  const post = allPosts.find(p => p.slug.toLowerCase() === lowerSlug);
  if (post) {
    if (post.status === 'published' || options.allowDrafts) {
      return { post };
    }
    return { post: null };
  }

  // Check redirects table for old slug
  const redirects = loadRedirects();
  const redirect = redirects.find(r => r.oldSlug.toLowerCase() === lowerSlug);
  if (redirect) {
    return { post: null, redirectTo: redirect.newSlug };
  }

  // Check post's oldSlugs array
  const postWithOldSlug = allPosts.find(p => p.oldSlugs && p.oldSlugs.some(os => os.toLowerCase() === lowerSlug));
  if (postWithOldSlug) {
    return { post: null, redirectTo: postWithOldSlug.slug };
  }

  return { post: null };
}

export function getPostById(id: string): BlogPost | null {
  const allPosts = loadAllPosts();
  return allPosts.find(p => p.id === id) || null;
}

export function createPost(input: Partial<BlogPost> & { title: string; content: string }): BlogPost {
  const allPosts = loadAllPosts();
  
  let baseSlug = input.slug ? slugify(input.slug) : slugify(input.title);
  if (!baseSlug) baseSlug = `post-${Date.now()}`;

  // Ensure unique slug
  let uniqueSlug = baseSlug;
  let counter = 1;
  while (allPosts.some(p => p.slug === uniqueSlug)) {
    uniqueSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  const author = getAuthorById(input.authorId || 'md-arbaaz');
  const now = new Date().toISOString();

  const newPost: BlogPost = {
    id: `post-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    slug: uniqueSlug,
    title: input.title,
    excerpt: input.excerpt || input.content.slice(0, 160).replace(/[#*`]/g, '') + '...',
    content: input.content,
    featuredImage: input.featuredImage || 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=500&fit=crop',
    imageAlt: input.imageAlt || input.title,
    authorId: author.id,
    authorName: author.name,
    authorAvatar: author.avatar,
    authorRole: author.role,
    category: input.category || 'Programming',
    tags: input.tags || ['Technology'],
    status: input.status || 'draft',
    publishedAt: input.status === 'published' ? (input.publishedAt || now) : '',
    updatedAt: now,
    createdAt: now,
    readingTime: calculateReadingTime(input.content),
    seoTitle: input.seoTitle || `${input.title} | KodeToCareer`,
    seoDescription: input.seoDescription || input.excerpt || input.title,
    canonicalUrl: input.canonicalUrl || `https://kodetocareer.com/blog/${uniqueSlug}`,
    ogImage: input.ogImage || input.featuredImage,
    isFeatured: input.isFeatured || false,
    relatedCourseSlug: input.relatedCourseSlug || 'mern-stack-development',
    faqs: input.faqs || []
  };

  const updatedPosts = [newPost, ...allPosts];
  saveAllPosts(updatedPosts);
  return newPost;
}

export function updatePost(id: string, input: Partial<BlogPost>): BlogPost | null {
  const allPosts = loadAllPosts();
  const index = allPosts.findIndex(p => p.id === id);
  if (index === -1) return null;

  const currentPost = allPosts[index];
  let updatedSlug = currentPost.slug;

  // If slug is changing, handle uniqueness and 301 redirect
  if (input.slug && slugify(input.slug) !== currentPost.slug) {
    const newBaseSlug = slugify(input.slug);
    let checkSlug = newBaseSlug;
    let counter = 1;
    while (allPosts.some(p => p.id !== id && p.slug === checkSlug)) {
      checkSlug = `${newBaseSlug}-${counter}`;
      counter++;
    }

    if (currentPost.status === 'published') {
      // Record 301 redirect from old slug to new slug
      const redirects = loadRedirects();
      redirects.push({
        oldSlug: currentPost.slug,
        newSlug: checkSlug,
        createdAt: new Date().toISOString()
      });
      saveRedirects(redirects);

      const oldSlugs = currentPost.oldSlugs || [];
      if (!oldSlugs.includes(currentPost.slug)) {
        oldSlugs.push(currentPost.slug);
      }
      input.oldSlugs = oldSlugs;
    }
    updatedSlug = checkSlug;
  }

  const now = new Date().toISOString();
  let authorDetails = {};
  if (input.authorId && input.authorId !== currentPost.authorId) {
    const author = getAuthorById(input.authorId);
    authorDetails = {
      authorId: author.id,
      authorName: author.name,
      authorAvatar: author.avatar,
      authorRole: author.role
    };
  }

  let publishedAt = currentPost.publishedAt;
  if (input.status === 'published' && !currentPost.publishedAt) {
    publishedAt = now;
  }

  const updatedPost: BlogPost = {
    ...currentPost,
    ...input,
    ...authorDetails,
    slug: updatedSlug,
    updatedAt: now,
    publishedAt,
    readingTime: input.content ? calculateReadingTime(input.content) : currentPost.readingTime
  };

  allPosts[index] = updatedPost;
  saveAllPosts(allPosts);
  return updatedPost;
}

export function deletePost(id: string): boolean {
  const allPosts = loadAllPosts();
  const filtered = allPosts.filter(p => p.id !== id);
  if (filtered.length === allPosts.length) return false;
  saveAllPosts(filtered);
  return true;
}

export function getRelatedPosts(currentPost: BlogPost, limit = 3): BlogPost[] {
  const allPosts = loadAllPosts();
  
  const published = allPosts.filter(p => p.id !== currentPost.id && p.status === 'published');
  
  // Score posts by category match, tags match, and related course match
  const scored = published.map(post => {
    let score = 0;
    if (post.category.toLowerCase() === currentPost.category.toLowerCase()) {
      score += 5;
    }
    if (post.relatedCourseSlug && post.relatedCourseSlug === currentPost.relatedCourseSlug) {
      score += 4;
    }
    if (post.tags && currentPost.tags) {
      const sharedTags = post.tags.filter(t => currentPost.tags.some(ct => ct.toLowerCase() === t.toLowerCase()));
      score += sharedTags.length * 2;
    }
    return { post, score };
  });

  scored.sort((a, b) => b.score - a.score || new Date(b.post.publishedAt).getTime() - new Date(a.post.publishedAt).getTime());

  return scored.slice(0, limit).map(item => item.post);
}
