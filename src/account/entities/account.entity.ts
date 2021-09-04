import { User } from './../../user/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryColumn()
  id: string;

  @Column({
    length: 40,
    nullable: false,
  })
  account: string;

  @Column({
    length: 50,
    nullable: false,
  })
  password: string;

  @Column({
    length: 10,
    nullable: true,
    default: 'normal',
  })
  role: string;

  @OneToOne((type) => User, (e) => e.account)
  user: User;
}
