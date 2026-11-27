export interface SocialPost {
  id: string;
  authorName: string;
  authorHandle: string;
  text: string;
  source: 'bluesky';
  url: string | null;
}