
import type { SocialPost } from '../types/social-post';

export const mockPosts: SocialPost[] = [
  {
    id: 'sample-1',
    authorName: 'Emily Parker',
    authorHandle: 'emily.example',
    text: 'We got the keys to our first home today. Still cannot believe it is ours.',
    source: 'bluesky',
    url: null,
  },
  {
    id: 'sample-2',
    authorName: 'Alex Morgan',
    authorHandle: 'alex.example',
    text: 'Our new baby arrived this morning! We are overwhelmed, tired and so happy.',
    source: 'bluesky',
    url: null,
  },
  {
    id: 'sample-3',
    authorName: 'Sam Brooks',
    authorHandle: 'sam.example',
    text: 'Officially taking the leap and starting a business today. Exciting times ahead!',
    source: 'bluesky',
    url: null,
  },
];