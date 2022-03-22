import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleRepository } from './article.repository';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(ArticleRepository)
    private articlesRepository: ArticleRepository,
  ) {}

  async insertArticles(data) {
    return await this.articlesRepository.insertArticles(data);
  }
}
