import { Repository, EntityRepository } from 'typeorm';
import Article from './article.entity';

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {
  async insertArticles(articles) {
    const mappedArticles = this.mapArticles(articles);
    return await this.createQueryBuilder()
      .insert()
      .into(Article)
      .values(mappedArticles)
      .orIgnore()
      .execute();
  }

  private mapArticles(articles) {
    return articles.map((article) => {
      return {
        sourceId: article.source.id,
        sourceName: article.source.name,
        author: article.author,
        title: article.title,
        description: article.description,
        url: article.url,
        publishedAt: article.publishedAt,
        content: article.content,
      };
    });
  }
}
