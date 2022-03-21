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

  describe('Api call', () => {
    it('should give an ok status on headlines endpoint', async () => {
      const result = await newsService.getHeadlines({
        country: 'ar',
        category: 'science',
      });
      expect(result).toEqual(expect.objectContaining({ status: 'ok' }));
    });

    it('should give an ok status on everything endpoint', async () => {
      const result = await newsService.getEverything({
        q: 'ukraine',
        searchIn: 'title',
      });
      expect(result).toEqual(expect.objectContaining({ status: 'ok' }));
    });
  });
});
