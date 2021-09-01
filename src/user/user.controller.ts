import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@Crud({
  model: {
    type: User
  },
  routes: {
    only: ['createOneBase', 'updateOneBase', 'getOneBase']
  }
})
@ApiTags("用户")
export class UserController implements CrudController<User>  {
  constructor(public service: UserService) {}
}
