import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Account } from './entities/account.entity';
import { v4 as uuid } from 'uuid'

@Injectable()
export class AccountService extends TypeOrmCrudService<Account> {
  constructor(@InjectRepository(Account) repo) {
    super(repo);
  }  
  
  genUUID() {
    return uuid();
  }
}
