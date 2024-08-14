import {
  Table,
  Column,
  Model,
  AutoIncrement,
  DataType,
  PrimaryKey,
} from 'sequelize-typescript';

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

  constructor(createUserDto?: Partial<User>) {
    super();
    if (createUserDto) {
      this.name = createUserDto.name;
      this.lastName = createUserDto.lastName;
      this.email = createUserDto.email;
      this.password = createUserDto.password;
    }
  }
}
