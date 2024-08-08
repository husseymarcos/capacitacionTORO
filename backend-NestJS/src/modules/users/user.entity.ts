import { Table, Column, Model } from 'sequelize-typescript';


@Table
export class User extends Model {
    
    @Column
    name: String

    @Column
    lastName: String

    @Column
    email: String

    @Column
    password: String



}