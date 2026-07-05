import fs from 'fs';
import path from 'path';
import { POSTS, BlogPost } from './posts';

const DYNAMIC_POSTS_PATH = path.join(process.cwd(), 'src/app/blog/dynamic_posts.json');

export function getMergedPostsServer(): BlogPost[] {
  let dynamicPosts: BlogPost[] = [];
  if (fs.existsSync(DYNAMIC_POSTS_PATH)) {
    try {
      const fileContent = fs.readFileSync(DYNAMIC_POSTS_PATH, 'utf8');
      dynamicPosts = JSON.parse(fileContent);
    } catch (err) {
      console.error('Error loading dynamic_posts.json:', err);
    }
  }
  return [...dynamicPosts, ...POSTS];
}
