import { Column, PrimaryGeneratedColumn, Entity, OneToOne, JoinColumn, OneToMany, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

// 为什么文章中没有创建者ID？
// 因为创建者不一样注册了账号，这里主要考虑的是审核...
@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: number;

  @Column()
  tags: string;

  @Column()
  title: string;

  @Column()
  content: string;

  // 这里的judgerId和之前的accountId不同，它是创建时必须提供的一个参数，而不是自动
  // 生成
  @Column({ default: null })
  judgerId: number;

  @Column()
  authors: string;

  @CreateDateColumn()
  ctime: Date

  // 注意这里用的多对一，这里为什么不是一对一呢？因为考虑单个文章是一对一
  // 但是多个文章也是一对一吗？虽然User是一对多，但文章改成一对一就说明
  // 文章只能有一个作者，反过来一个作者也只有一个文章，所以这里要改成
  // 多对一，不这样对应会出现外键无法重复的情况...
  @ManyToOne((type) => User, (user) => user.article)
  @JoinColumn({ name: 'judgerId' })
  user: User;

}