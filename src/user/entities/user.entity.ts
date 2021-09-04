import { Account } from './../../account/entities/account.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 30,
    nullable: true,
    default: '未设置',
  })
  name: string;

  @Column({
    length: 40,
    nullable: false,
  })
  nickname: string;

  @Column({
    length: 40,
    nullable: true,
    default: '未设置',
  })
  email: string;

  @Column({
    length: 30,
    nullable: true,
    default: '未设置',
  })
  phone: string;

  @Column({
    length: 50,
    nullable: true,
    default: '这个人什么都没写...',
  })
  sign: string;

  @Column({ default: null })
  accountId: string;

  @OneToOne((type) => Account, (e) => e.user)
  @JoinColumn({ name: 'accountId' })
  account: Account;
}
