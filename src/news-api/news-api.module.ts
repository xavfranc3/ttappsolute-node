import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NewsApiService } from './news-api.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [HttpModule],
  providers: [NewsApiService, ConfigService],
  exports: [NewsApiService],
  controllers: [],
})
export class NewsApiModule {}
