import { DATEONLY, InferAttributes, InferCreationAttributes } from 'sequelize';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserModel } from './user.entity';

@Table({ tableName: 'taskTable' })
export class TodoModel extends Model<
  InferCreationAttributes<TodoModel>,
  InferAttributes<TodoModel>
> {
  @Column({ autoIncrement: true, primaryKey: true })
  id: number;

  @Column
  tittle: string;

  @Column
  task: string;

  @Column({ type: DATEONLY })
  task_creation_date: Date;

  @Column({ type: DATEONLY })
  last_date: Date;

  @Column({ defaultValue: false })
  is_completed: boolean;

  @Column({ defaultValue: false })
  is_deleted: boolean;

  @ForeignKey(() => UserModel)
  @Column
  user_id: number;

  @BelongsTo(() => UserModel)
  usertable: UserModel;
}
