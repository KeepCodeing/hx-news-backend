import { User } from './../../user/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  @JoinColumn()
  id: number;

  @Column({
    length: 40,
    nullable: false
  })
  account: string;

  @Column({
    length: 50,
    nullable: false
  })
  password: string;

  @Column({
    length: 10,
    nullable: true,
    default: 'normal'
  })
  role: string;

  @OneToOne((type) => User, (e) => e.account)
  user: User;
  
}