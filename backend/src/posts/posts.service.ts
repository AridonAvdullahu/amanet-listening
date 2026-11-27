import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppBskyFeedPost, AtpAgent } from '@atproto/api';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);

  private agentPromise: Promise<AtpAgent> | null = null;

  constructor(private readonly configService: ConfigService) {}

  private createAgent = async (): Promise<AtpAgent> => {
    const agent = new AtpAgent({
      service: 'https://bsky.social',
    });

    await agent.login({
      identifier: this.configService.getOrThrow<string>('BSKY_IDENTIFIER'),
      password: this.configService.getOrThrow<string>('BSKY_APP_PASSWORD'),
    });

    return agent;
  };

  private getAgent = (): Promise<AtpAgent> => {
    if (!this.agentPromise) {
      this.agentPromise = this.createAgent().catch((error: unknown) => {
        this.agentPromise = null;

        throw error;
      });
    }

    return this.agentPromise;
  };

  search = async (query: string) => {
    try {
      const agent = await this.getAgent();

      const response = await agent.app.bsky.feed.searchPosts({
        q: query,
        limit: 20,
        sort: 'latest',
      });

      return response.data.posts.flatMap((post) => {
        if (
          !AppBskyFeedPost.isRecord(post.record) ||
          typeof post.record.text !== 'string'
        ) {
          return [];
        }

        const postKey = post.uri.split('/').at(-1);

        if (!postKey) return [];

        return [
          {
            id: post.uri,
            source: 'bluesky' as const,
            authorName:
              post.author.displayName?.trim() || post.author.handle,
            authorHandle: post.author.handle,
            text: post.record.text,
            url: `https://bsky.app/profile/${post.author.handle}/post/${postKey}`,
          },
        ];
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Unknown error';

      this.logger.warn(`Bluesky search failed: ${message}`);

      throw new ServiceUnavailableException(
        'Bluesky search is unavailable. Please try again.',
      );
    }
  };
}