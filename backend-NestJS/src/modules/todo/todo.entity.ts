import {
    Table,
    Column,
    Model,
    AutoIncrement,
    DataType,
    PrimaryKey,
    ForeignKey,
    BelongsTo,
  } from 'sequelize-typescript';
import { User } from '../users/user.entity';

@Table
export class Todo extends Model<Todo> {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column(DataType.TEXT)
  description: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  completed: boolean;

  @Column(DataType.DATE)
  dueDate: Date;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
