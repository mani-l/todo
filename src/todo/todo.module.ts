import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/entity/user.entity';
import { TodoModel } from 'src/entity/todo.entity';

@Module({
  imports: [SequelizeModule.forFeature([UserModel, TodoModel])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
