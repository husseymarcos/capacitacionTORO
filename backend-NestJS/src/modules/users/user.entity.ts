import {
  Table,
  Column,
  Model,
  AutoIncrement,
  DataType,
  PrimaryKey,
  HasMany
} from 'sequelize-typescript';

import { Todo } from '../todo/todo.entity';

@Table
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column
  name: string;

  @Column
  lastName: string;

  @Column
  email: string;

  @Column
  password: string;

  @HasMany(() => Todo)
  todos: Todo[];

  constructor(createUserDto?: Partial<User>) {
    super();
    if (createUserDto) {
      this.name = createUserDto.name;
      this.lastName = createUserDto.lastName;
      this.email = createUserDto.email;
      this.password = createUserDto.password;
      this.todos = []
    }
  }
}
