import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  name: string;

  @Column
  lastName: string;

  @Column
  email: string;

  @Column
  password: string;
}
