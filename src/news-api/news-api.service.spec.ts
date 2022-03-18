import * as dotenv from 'dotenv';

dotenv.config();
import { Test, TestingModule } from '@nestjs/testing';
import { NewsApiService } from './news-api.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('NewsApiCallService', () => {
  let service: NewsApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule],
      providers: [NewsApiService],
    }).compile();

    service = module.get<NewsApiService>(NewsApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should give an ok status', async () => {
    const result = await service.getTopHeadlineArticles();
    expect(result).toEqual(expect.objectContaining({ status: 'ok' }));
  });
});
