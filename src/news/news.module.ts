import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleRepository } from './article.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleRepository])],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
