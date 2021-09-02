import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('权限')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    this.authService = authService;
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  login(@Request() req) {
    return this.authService.genToken({
      account: req.body.account,
      password: req.body.password,
    });
  }
}
