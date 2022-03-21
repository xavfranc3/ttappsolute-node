import { Test, TestingModule } from '@nestjs/testing';
import { NewsService } from './news.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ArticleRepository } from './article.repository';

describe('NewsService', () => {
  let service: NewsService;
  let articleRepository: ArticleRepository;

  const ARTICLE_REPOSITORY_TOKEN = getRepositoryToken(ArticleRepository);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NewsService,
        {
          provide: ARTICLE_REPOSITORY_TOKEN,
          useValue: {
            find: jest.fn(),
            insertArticles: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<NewsService>(NewsService);
    articleRepository = module.get<ArticleRepository>(ARTICLE_REPOSITORY_TOKEN);
  });

  describe('Service and repository should be defined', () => {
    it('Service should be defined', () => {
      expect(service).toBeDefined();
    });

    it('Article repository should be defined', () => {
      expect(articleRepository).toBeDefined();
    });
  });

  describe('insertArticles', () => {
    it('should call on the repository', async () => {
      await service.insertArticles([
        {
          sourceName: 'lolo',
          author: 'lolo',
          title: 'lolo',
          description: 'lolo',
          url: 'lolo',
          publishedAt: '2022-01-01',
          content: 'lolo',
        },
      ]);
      expect(articleRepository.insertArticles).toHaveBeenCalled();
    });
  });
});
