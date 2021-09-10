import {
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class ExcelStudentInfo {
  @PrimaryColumn()
  id: number;

  @Column()
  age: number;

  @Column()
  address: string;

  @Column()
  qq: string;

  @Column()
  grade: string;

  @Column()
  name: string;

  @Column()
  gender: number;

  @Column()
  phone: string;
  
  @Column()
  classname: string;
}
