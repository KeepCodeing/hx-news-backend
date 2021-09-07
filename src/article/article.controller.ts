import { ArticleDto } from './dto/article.dto';
import { ArticleService } from './article.service';
import { Article } from './entities/article.entity';
import { Controller } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';

@ApiTags('文章')
@Crud({
  model: {
    type: Article,
  },
  routes: {
    only: [
      'createOneBase',
      'deleteOneBase',
      'updateOneBase',
      'getOneBase',
      'getManyBase',
    ],
  },
  query: {
    join: {
      user: {
        exclude: ['email', 'phone', 'sign', 'accountId'],
      },
    },
    limit: 10,
    alwaysPaginate: true,
  },
})
@Controller('article')
export class ArticleController implements CrudController<Article> {
  constructor(public service: ArticleService) {}

  get base(): CrudController<Article> {
    return this;
  }

  @Override()
  @ApiBody({ type: ArticleDto, description: "创建文章" })
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: Article,
  ) {
    // this.base.createOneBase()
    this.base.createOneBase(req, dto);
  }
}
