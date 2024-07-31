import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
     @Column
     firstName: string;

     @Column
     lastName: string;

     @Column({ unique: true })
     email: string;

     @Column
     password: string;
}