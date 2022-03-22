import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { NewsService } from '../news.service';

@Processor('news')
export class ArticleProcessor {
  constructor(private readonly newsService: NewsService) {}

  @Process('article')
  handleInsertArticles(job: Job) {
    return this.newsService.insertArticles(job.data.articles);
  }
}
