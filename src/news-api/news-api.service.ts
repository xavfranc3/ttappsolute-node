import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NewsApiService {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor(
    private httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get('NEWS_API_BASE_URL');
    this.apiKey = this.configService.get('NEWS_API_KEY1');
  }

  async getArticles(filters) {
    return filters.topHeadlines
      ? this.getHeadlines(filters.params)
      : this.getEverything(filters.params);
  }

  async getHeadlines(filterParams): Promise<Observable<AxiosResponse<any>>> {
    try {
      const finalParams = this.getFinalParams(filterParams);
      const response = await lastValueFrom(
        this.httpService.get('/top-headlines', {
          baseURL: this.baseUrl,
          headers: { 'X-Api-Key': this.apiKey },
          params: finalParams,
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        `error: ${error.message}, code: ${error.statusCode}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getEverything(filterParams): Promise<Observable<AxiosResponse<any>>> {
    try {
      const finalParams = this.getFinalParams(filterParams);
      const response = await lastValueFrom(
        this.httpService.get('/everything', {
          baseURL: this.baseUrl,
          headers: { 'X-Api-Key': this.apiKey },
          params: finalParams,
        }),
      );
      return response.data;
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

  private getFinalParams(filterParams) {
    return Object.entries(filterParams)
      .filter(([_, v]) => v != null)
      .reduce((finalParams, [k, v]) => ({ ...finalParams, [k]: v }), {});
  }
}
