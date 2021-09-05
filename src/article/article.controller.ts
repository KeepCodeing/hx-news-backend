import { ArticleService } from './article.service';
import { Article } from './entities/article.entity';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

@ApiTags("文章")
@Crud({
  model: {
    type: Article
  }
})
@Controller('article')
export class ArticleController implements CrudController<Article> {
  constructor(public service: ArticleService) {}
}
