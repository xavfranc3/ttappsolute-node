import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleRepository } from './article.repository';
import { BullModule } from '@nestjs/bull';
import { NewsApiService } from '../news-api/news-api.service';
import { NewsApiModule } from '../news-api/news-api.module';
import { HttpModule } from '@nestjs/axios';
import { ArticleProcessor } from './workers/article.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleRepository]),
    BullModule.registerQueue({ name: 'news' }),
    NewsApiModule,
    HttpModule,
  ],
  controllers: [NewsController],
  providers: [NewsService, NewsApiService, ArticleProcessor],
})
export class NewsModule {}
