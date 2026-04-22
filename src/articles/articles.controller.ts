import { Controller, Get, Query } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { GetArticlesQueryDto } from './dtos/get-articles-query.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  getPageArticles(@Query() query: GetArticlesQueryDto) {
    return this.articlesService.findPaginated(query);
  }
}
