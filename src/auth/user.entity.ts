import * as bcrypt from 'bcrypt';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Task } from 'src/tasks/task.entity';

@Entity({ name: 'users' })
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  // @OneToMany(() => Task, (task) => task.user)
  // tasks: Task[];

  async validatePassword(password: string) {
    const user = await bcrypt.compare(password, this.password);
    return user;
  }
}
