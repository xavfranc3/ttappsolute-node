import { Injectable } from '@nestjs/common';
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
    this.apiKey = this.configService.get('NEWS_API_KEY2');
  }

  async getArticles(filters) {
    return filters.topHeadlines
      ? this.getHeadlines(filters.params)
      : this.getEverything(filters.params);
  }

  async getHeadlines(filterParams): Promise<Observable<AxiosResponse<any>>> {
    const finalParams = this.getFinalParams(filterParams);
    const response = await lastValueFrom(
      this.httpService.get('/top-headlines', {
        baseURL: this.baseUrl,
        headers: { 'X-Api-Key': this.apiKey },
        params: finalParams,
      }),
    );
    return response.data;
  }

  async getEverything(filterParams): Promise<Observable<AxiosResponse<any>>> {
    const finalParams = this.getFinalParams(filterParams);
    const response = await lastValueFrom(
      this.httpService.get('/everything', {
        baseURL: this.baseUrl,
        headers: { 'X-Api-Key': this.apiKey },
        params: finalParams,
      }),
    );
    return response.data;
  }

  private static getFinalParams(filterParams) {
    return Object.entries(filterParams)
      .filter(([_, v]) => v != null)
      .reduce((finalParams, [k, v]) => ({ ...finalParams, [k]: v }), {});
  }
}
