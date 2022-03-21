import { Repository, EntityRepository } from 'typeorm';
import Article from './article.entity';

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {
  async insertArticles(articles) {
    return await this.createQueryBuilder()
      .insert()
      .into(Article)
      .values(articles)
      .orIgnore()
      .execute();
  }
}
