import { JwtStrategy } from './jwt.strategy';
import { jwtContants } from './jwt.contants';
import { AccountModule } from './../account/account.module';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule,
    AccountModule,
    JwtModule.register({ secret: jwtContants.secret }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
