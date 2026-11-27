export interface SocialPost {
  id: string;
  authorName: string;
  authorHandle: string;
  text: string;
  avatarUrl?: string | null;
  source: 'bluesky';
  url: string | null;
}