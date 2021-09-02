import { LoginDto } from './dto/login.dto';
import { AccountService } from './../account/account.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  )
  {
    this.accountService = accountService;
    this.jwtService = jwtService;
  }

  async validate(account: string, password: string) {
    const user = await this.accountService.findOne({ account });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async genToken(loginDto: LoginDto) {
    return {
      token: this.jwtService.sign(loginDto)
    }
  }
}
