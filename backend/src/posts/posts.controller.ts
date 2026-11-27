import { Controller, Get, Query } from '@nestjs/common';
import { PostsService } from './posts.service.js';
import { SearchPostsDto } from './dto/search-posts.dto.js';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  searchPosts(@Query() query: SearchPostsDto) {
    return this.postsService.search(query.q);
  }
}