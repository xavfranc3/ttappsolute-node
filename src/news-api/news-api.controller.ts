import { Controller, Get } from '@nestjs/common';
import { NewsApiService } from './news-api.service';

@Controller('news-api')
export class NewsApiController {
  constructor(private readonly service: NewsApiService) {}

  @Get()
  getArticles() {
    return this.service.getTopHeadlineArticles();
  }
}
