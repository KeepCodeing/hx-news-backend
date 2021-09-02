import { UserService } from './../user/user.service';
import { Account } from './entities/account.entity';
import { Controller } from '@nestjs/common';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { AccountService } from './account.service';
import { ApiTags } from '@nestjs/swagger';
import { SkipAuth } from '../decorators/auth.decorator';

@Controller('account')
@Crud({
  model: {
    type: Account,
  },
  routes: {
    only: ['createOneBase', 'getOneBase', 'updateOneBase'],
  },
})
@ApiTags("账号")
export class AccountController implements CrudController<Account> {
  constructor(public service: AccountService, public userService: UserService) {}

  get base(): CrudController<Account> {
    return this;
  }

  // 重载原有的增加方法，在这里添加增加新用户信息的逻辑...
  @SkipAuth()
  @Override()
  async createOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: Account) {
    this.userService.createOne(req, { nickname: dto.account });
    return this.base.createOneBase(req, dto);
  }
}
