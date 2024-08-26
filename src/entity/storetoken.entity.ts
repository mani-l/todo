import { InferAttributes, InferCreationAttributes } from 'sequelize';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserModel } from './user.entity';

@Table({ tableName: 'token' })
export class StoreTokenModel extends Model<
  InferCreationAttributes<StoreTokenModel>,
  InferAttributes<StoreTokenModel>
> {
  @Column({ autoIncrement: true, primaryKey: true })
  id: number;

  @Column
  accesstoken: string;

  @Column
  accesstoken_expire: Date;

  @Column
  refreshtoken: string;

  @Column
  refreshtoken_expire: Date;

  @Column({ defaultValue: false })
  is_deleted: boolean;

  @ForeignKey(() => UserModel)
  @Column
  user_id: number;

  @BelongsTo(() => UserModel)
  usertable: UserModel;
}
