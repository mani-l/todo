import { InferAttributes, InferCreationAttributes } from 'sequelize';
import {
  Column,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { StoreTokenModel } from './storetoken.entity';
import { TodoModel } from './todo.entity';

@Table({ tableName: 'login' })
export class UserModel extends Model<
  InferCreationAttributes<UserModel>,
  InferAttributes<UserModel>
> {
  @Column({ autoIncrement: true, primaryKey: true })
  id: number;

  @Column
  user_name: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column({ defaultValue: false })
  is_deleted: boolean;

  @HasOne(() => StoreTokenModel)
  tokentable: StoreTokenModel;

  @HasMany(() => TodoModel)
  todotable: TodoModel;
}
