import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { NewsApiService } from './news-api/news-api.service';
import { NewsApiModule } from './news-api/news-api.module';
import * as Joi from 'joi';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        PORT: Joi.number().required(),
        NEWS_API_KEY: Joi.string(),
        NEWS_API_BASE_URL: Joi.string(),
      }),
      isGlobal: true,
    }),
    DatabaseModule,
    NewsApiModule,
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService, NewsApiService],
})
export class AppModule {}
