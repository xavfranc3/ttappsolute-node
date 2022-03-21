import { Controller, Get, HttpCode, Post, Body } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('/')
  @HttpCode(200)
  async getArticles() {
    return this.newsService.getAllArticles();
  }

  @Post('/')
  async insertArticles(@Body() data) {
    return await this.newsService.insertArticles(data);
  }
}
