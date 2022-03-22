import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NewsApiService } from './news-api.service';

@Module({
  imports: [HttpModule],
  providers: [NewsApiService],
  exports: [NewsApiService],
  controllers: [],
})
export class NewsApiModule {}
