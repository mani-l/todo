import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from './config/db.config';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [SequelizeModule.forRoot(databaseConfig), UserModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
