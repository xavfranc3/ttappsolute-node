import { Controller, HttpCode, Post, Body } from '@nestjs/common';
import { NewsApiService } from '../news-api/news-api.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ArticlesDto } from './dto/articles.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('news')
export class NewsController {
  constructor(
    @InjectQueue('news') private readonly newsQueue: Queue,
    private readonly newsApiService: NewsApiService,
  ) {}

  @Post('/')
  @ApiTags('Articles')
  @ApiResponse({ status: 200, description: 'Articles successfully acquired' })
  @HttpCode(200)
  async getArticles(@Body() data: ArticlesDto) {
    const articles = await this.newsApiService.getEverything(data);
    await this.newsQueue.add(
      'article',
      { articles },
      { priority: 1, timeout: 60000 },
    );
    return articles;
  }
}
