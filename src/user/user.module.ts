import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { StoreTokenModel } from 'src/entity/storetoken.entity';
import { TodoModel } from 'src/entity/todo.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel, StoreTokenModel, TodoModel]),
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
