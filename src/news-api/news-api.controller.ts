import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { NewsApiService } from './news-api.service';
import { FilterParamsDto } from './filterParams.dto';

@Controller('news')
export class NewsApiController {
  constructor(private readonly newsService: NewsApiService) {}

  @Post('/')
  @HttpCode(200)
  async getArticles(@Body() filterParams: FilterParamsDto) {
    return this.newsService.getArticles(filterParams);
  }
}
