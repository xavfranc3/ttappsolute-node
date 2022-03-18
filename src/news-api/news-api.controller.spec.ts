import { Test, TestingModule } from '@nestjs/testing';
import { NewsApiController } from './news-api.controller';
import { NewsApiService } from './news-api.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('NewsApiCallController', () => {
  let controller: NewsApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewsApiService],
      controllers: [NewsApiController],
      imports: [HttpModule, ConfigModule],
    }).compile();

    controller = module.get<NewsApiController>(NewsApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
