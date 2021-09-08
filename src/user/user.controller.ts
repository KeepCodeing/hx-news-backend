import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Controller, Get, Request } from '@nestjs/common';
import { Crud, CrudController, Override, CrudRequest, ParsedRequest } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@Crud({
  model: {
    type: User
  },
  routes: {
    only: ['createOneBase', 'updateOneBase', 'getOneBase']
  },
  query: {
    join: {
      account: {
        exclude: ['password'],
      },
    }
  }
})
@ApiTags("用户")
export class UserController {
  constructor(public service: UserService) {}

  get base(): CrudController<User> {
    return this;
  }

  @Get("/userinfo")
  getUserInfo(@Request() req) {
    return this.service.getUserInfo(req.user.id, req.user.role);
  }
}
