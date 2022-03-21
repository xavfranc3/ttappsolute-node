import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NewsApiService } from './news-api.service';
import { NewsApiController } from './news-api.controller';

@Module({
  imports: [HttpModule],
  providers: [NewsApiService],
  exports: [NewsApiService],
  controllers: [NewsApiController],
})
export class NewsApiModule {}
