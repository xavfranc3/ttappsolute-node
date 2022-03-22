import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import Article from '../news/article.entity';

@Injectable()
export class NewsApiService {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor(
    private httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get('NEWS_API_BASE_URL');
    this.apiKey = this.configService.get('NEWS_API_KEY');
  }

  async getEverything(filterParams): Promise<Article> {
    try {
      const response = await lastValueFrom(
        this.httpService
          .get('/everything', {
            baseURL: this.baseUrl,
            headers: { 'X-Api-Key': this.apiKey },
            params: filterParams,
          })
          .pipe(map((response) => response.data)),
      );
      return response.articles;
    } catch (error) {
      if (error.response.status === 400) {
        throw new HttpException(
          `Required parameters are missing, the scope of your search is too broad.`,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          'We apologize but our server seems to have encountered a problem. Please try again later.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
