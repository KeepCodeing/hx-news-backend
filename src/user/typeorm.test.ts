// 用来测试typeorm的各种特性
import { User } from './entities/user.entity';
import { Account } from '../account/entities/account.entity';
import { createConnection, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

// 关于为什么不会自动生成外键：
// 原因是设置的关系但在创建时没有连接他们，首先副表的关系列必须连接到主表，也就是
// 把这一列填充成主表的数据，在进行保存等操作时必须得先从主表开始，这是因为外键
// 约束要求约束的键不为空

const test = () => {
  const conn = createConnection({
    name: 'test',
    type: 'mysql',
    database: 'hx-backend',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '114514',
    charset: 'UTF8',
    entities: [User, Account],
    synchronize: true,
    dropSchema: true,
    logging: 'all',
    logger: 'simple-console',
  }).then(async (connection) => {
    let userRepository: Repository<User> = connection.getRepository(User);
    let accountRepository: Repository<Account> =
      connection.getRepository(Account);
    const uid = uuid();
    const user: User = userRepository.create({ nickname: 'asdf' });
    const account: Account = accountRepository.create({
      id: uid,
      password: '114514',
      account: '114514',
    });
    user.account = account;
    await accountRepository.save(account);
    await userRepository.save(user);  
    connection.close();
  });
}