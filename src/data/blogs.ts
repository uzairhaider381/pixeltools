import { posts1 } from "./blogs-part1";
import { posts2 } from "./blogs-part2";

export interface BlogPost {
  id: string
  slug: string
  title: string
  description: string
  date: string
  readTime: string
  category: string
  content: string 
}

export const blogPosts: BlogPost[] = [...posts1, ...posts2];
