import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TodoCreateDto } from 'src/dto/createtodo.dto';
import { TodoUpateDto } from 'src/dto/updatetodo.dto';
import { UpdateUserDto } from 'src/dto/updateuser.dto';
import { TodoModel } from 'src/entity/todo.entity';

@Injectable()
export class TodoService {
  constructor(@InjectModel(TodoModel) private todomodel: typeof TodoModel) {}

  async taskcreation(
    tittle: string,
    task: string,
    task_creation_date: Date,
    last_date: Date,
    user_id: number,
  ): Promise<TodoCreateDto> {
    const datas = { tittle, task, task_creation_date, last_date, user_id };
    return await this.todomodel.create(datas);
  }

  async getalltask(){
    const datas = await this.todomodel.findAll()
    return datas;
  }

  async iscompleted(id: number, details: TodoUpateDto): Promise<any> {
    const existinguser = await this.todomodel.findByPk(id);
    const update = await this.todomodel.update(details,{
        where:{id:existinguser.id},
        returning:true
    });
    return "successfully completed"
  }

  async deletetask(user_id:number){
    const existinguser = await this.todomodel.findByPk(user_id)
    const data = await this.todomodel.destroy({
      where:{id:user_id},
      force:true,
    });

    return 'task deleted successfully'
  }
}
