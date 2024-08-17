import { Table, Column, Model, HasMany } from 'sequelize-typescript';

import { Todo } from '../todo/todo.entity';

@Table
export class User extends Model<User> {
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
}
