import { User } from './../user/entities/user.entity';
import { UserService } from './../user/user.service';
import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';

// 如何在别的模块使用其他模块的Crud生成的方法：
// 首先Crud生成的方法似乎还是个service，所以需要导入Service，
// 此外因为操作了Repo所以也要将其Entity声明在TypeOrmModule里
@Module({
  providers: [AccountService, UserService],
  controllers: [AccountController],
  exports: [AccountService],
  imports: [TypeOrmModule.forFeature([Account, User])],
})
export class AccountModule {}
