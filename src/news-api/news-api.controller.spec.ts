import { Test, TestingModule } from '@nestjs/testing';
import { NewsApiController } from './news-api.controller';
import { NewsApiService } from './news-api.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import * as request from 'supertest';

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

  it('should return an ok status for headlines request', async () => {
    const response = await request
      .agent('http://localhost:5000/news')
      .post('/')
      .send({
        topHeadlines: true,
        params: { country: 'be', category: 'technology' },
      })
      .expect(200);
    expect(response.body).toEqual(expect.objectContaining({ status: 'ok' }));
  });

  it('should return an ok status for everything request', async () => {
    const response = await request
      .agent('http://localhost:5000/news')
      .post('/')
      .send({
        topHeadlines: false,
        params: { q: '+apple', searchIn: 'title', language: 'fr' },
      })
      .expect(200);
    expect(response.body).toEqual(expect.objectContaining({ status: 'ok' }));
  });
});
