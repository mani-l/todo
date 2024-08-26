import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoCreateDto } from 'src/dto/createtodo.dto';
import { TodoUpateDto } from 'src/dto/updatetodo.dto';
import { TodoModel } from 'src/entity/todo.entity';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoservice: TodoService) {}

  @Post('task-creation')
  async taskcreation(@Body() taskdetails: TodoCreateDto) {
    return this.todoservice.taskcreation(
      taskdetails.tittle,
      taskdetails.task,
      taskdetails.task_creation_date,
      taskdetails.last_date,
      taskdetails.user_id,
    );
  }

  @Get('getalltask')
  async getalltask(){
    return this.todoservice.getalltask()
  }
 

  @Patch('is-completed/:id')
  async iscompleted(@Param('id') id:number,@Body() completedetail:TodoUpateDto){
    return this.todoservice.iscompleted(id,completedetail)
  }

  @Delete('delete-task/:id')
  async deletetask(@Param('id') id:number){
    return this.todoservice.deletetask(id)
  }
}
