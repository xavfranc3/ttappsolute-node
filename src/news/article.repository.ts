import { Repository, EntityRepository } from 'typeorm';
import Article from './article.entity';

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {
  async insertArticles(articles) {
    const formattedArticles = this.formatArticles(articles);
    return await this.createQueryBuilder()
      .insert()
      .into(Article)
      .values(formattedArticles)
      .orIgnore()
      .execute();
  }

  private formatArticles(articles) {
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
