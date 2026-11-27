import type { SocialPost } from './social-post';

export interface ReplyDraft {
  post: SocialPost;
  reply: string;
}