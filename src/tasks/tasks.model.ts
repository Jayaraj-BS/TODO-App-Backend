import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Tasks extends Model<Tasks> {
  @Column
  taskName: string;

  @Column
  description: string;
}