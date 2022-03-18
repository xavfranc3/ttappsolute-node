import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NewsApiService {
  private baseUrl: string;
  private apiKey: string;

  constructor(
    private httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get('NEWS_API_BASE_URL');
    this.apiKey = this.configService.get('NEWS_API_KEY');
  }

  async getTopHeadlineArticles(): Promise<Observable<AxiosResponse<any>>> {
    const response = await lastValueFrom(
      this.httpService.get('/top-headlines', {
        baseURL: this.baseUrl,
        headers: { 'X-Api-Key': this.apiKey },
        params: {
          q: { country: 'us' },
        },
      }),
    );
    return response.data;
  }

  async getEverything(): Promise<Observable<AxiosResponse<any>>> {
    const response = await lastValueFrom(
      this.httpService.get('/everything?country=us', {
        baseURL: this.baseUrl,
        headers: { 'X-Api-Key': this.apiKey },
      }),
    );
    return response.data;
  }
}
