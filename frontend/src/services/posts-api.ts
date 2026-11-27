import type { SocialPost } from '../types/social-post';

export const searchPosts = async (
  query: string,
): Promise<SocialPost[]> => {
  const params = new URLSearchParams({
    q: query,
  });

  const response = await fetch(`/api/posts?${params.toString()}`);

  if (!response.ok) {
    throw new Error('Could not load posts. Please try again.');
  }

  const posts: SocialPost[] = await response.json();

  return posts;
};