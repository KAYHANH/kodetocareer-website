// GA4 Event Tracking Utility Library for KodeToCareer

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-EXTRACTEDID';

// Helper to push events safely to GA4
export function sendGAEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, {
      page_path: window.location.pathname,
      timestamp: new Date().toISOString(),
      ...params,
    });
  }
}

// 1. Lead Events
export function trackLeadEvent(eventName: 'generate_lead' | 'course_enquiry' | 'counselling_request' | 'contact_form_submit' | 'whatsapp_click' | 'phone_click', data: {
  courseName?: string;
  courseSlug?: string;
  ctaLocation?: string;
  formType?: string;
  phone?: string;
  email?: string;
}) {
  sendGAEvent(eventName, {
    category: 'Lead',
    course_name: data.courseName || 'General',
    course_slug: data.courseSlug || 'general',
    cta_location: data.ctaLocation || 'unknown',
    form_type: data.formType || 'standard',
    value: 1,
  });
}

// 2. Course Engagement Events
export function trackCourseEvent(eventName: 'course_view' | 'course_cta_click' | 'curriculum_view' | 'enroll_click', data: {
  courseName: string;
  courseSlug: string;
  ctaLocation?: string;
  price?: string;
}) {
  sendGAEvent(eventName, {
    category: 'Course',
    course_name: data.courseName,
    course_slug: data.courseSlug,
    cta_location: data.ctaLocation || 'course_page',
    price: data.price || 'Free Trial',
  });
}

// 3. Free Resource Events
export function trackResourceEvent(eventName: 'resource_view' | 'resource_download' | 'brochure_download', data: {
  resourceTitle: string;
  resourceCategory?: string;
  ctaLocation?: string;
}) {
  sendGAEvent(eventName, {
    category: 'Resource',
    resource_title: data.resourceTitle,
    resource_category: data.resourceCategory || 'Guide',
    cta_location: data.ctaLocation || 'resource_modal',
  });
}

// 4. AI Tools Events
export function trackAiToolEvent(eventName: 'ai_tool_start' | 'ai_tool_complete' | 'resume_grader_start' | 'mock_interview_start', data: {
  toolName: string;
  score?: number;
  status?: string;
}) {
  sendGAEvent(eventName, {
    category: 'AI_Tools',
    tool_name: data.toolName,
    score: data.score,
    status: data.status || 'started',
  });
}

// 5. Blog Engagement Events
export function trackBlogEvent(eventName: 'blog_view' | 'blog_cta_click', data: {
  articleTitle: string;
  articleSlug: string;
  category?: string;
  ctaLocation?: string;
}) {
  sendGAEvent(eventName, {
    category: 'Blog',
    article_title: data.articleTitle,
    article_slug: data.articleSlug,
    blog_category: data.category || 'General',
    cta_location: data.ctaLocation || 'in_article',
  });
}
