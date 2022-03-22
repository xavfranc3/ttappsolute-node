import * as dotenv from 'dotenv';

dotenv.config();
import { Test, TestingModule } from '@nestjs/testing';
import { NewsApiService } from './news-api.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('NewsApiCallService', () => {
  let newsService: NewsApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule],
      providers: [NewsApiService],
    }).compile();

    newsService = module.get<NewsApiService>(NewsApiService);
  });

  it('should be defined', () => {
    expect(newsService).toBeDefined();
  });

  it('should give an ok status on endpoint', async () => {
    const result = await newsService.getEverything({
      q: 'apple',
      language: 'fr',
      searchIn: 'title',
    });
    expect(result).toEqual(
      expect.arrayContaining([expect.objectContaining({})]),
    );
  });
});
