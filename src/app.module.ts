import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { NewsApiService } from './news-api/news-api.service';
import { NewsApiModule } from './news-api/news-api.module';
import * as Joi from 'joi';
import { HttpModule } from '@nestjs/axios';
import { NewsModule } from './news/news.module';
import { BullModule } from '@nestjs/bull';

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
        NEWS_API_KEY1: Joi.string(),
        NEWS_API_KEY2: Joi.string(),
        NEWS_API_BASE_URL: Joi.string(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
      }),
      isGlobal: true,
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        },
      }),
    }),
    DatabaseModule,
    NewsApiModule,
    HttpModule,
    NewsModule,
  ],
  controllers: [],
  providers: [NewsApiService],
})
export class AppModule {}
