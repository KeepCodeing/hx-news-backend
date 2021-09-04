import { UserService } from './../user/user.service';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { SkipAuth } from '../decorators/auth.decorator';

@Controller('auth')
@ApiTags('权限')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    this.authService = authService;
  }

  @SkipAuth()
  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  async login(@Request() req) {
    // 注意auth的接口和其它的不一样，这里post的时候要传的是username和password...
    return this.authService.getUserInfo(
      {
        account: req.body.account,
        password: req.body.password,
      },
      req.user,
    );
  }
}
