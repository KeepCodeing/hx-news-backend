import { LoginDto } from './dto/login.dto';
import { AccountService } from './../account/account.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { info } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  )
  {
    this.accountService = accountService;
    this.jwtService = jwtService;
    this.userService = userService;
  }

  async validate(account: string, password: string) {
    const user = await this.accountService.findOne({ account });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async genToken(user: any) {
    return {
      token: this.jwtService.sign(user)
    }
  }

  async getUserInfo(loginDto: LoginDto, user: any) {
    // const userInfo = await this.userService.findOne({ accountId: user.id });
    const { id, role, account } = user;
    return {
      token: (await this.genToken(user)).token,
      // ...userInfo,
      userId: id,
      role,
      account
    }
  }
}
