import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { NewsApiService } from './news-api.service';
import { FilterParamsDto } from './filterParams.dto';

@Controller('news-api')
export class NewsApiController {
  constructor(private readonly newsService: NewsApiService) {}

  @Post('/')
  @HttpCode(200)
  async getArticles(@Body() filterParams: FilterParamsDto) {
    try {
      return this.newsService.getArticles(filterParams);
    } catch (error) {
      throw new HttpException(
        `${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
