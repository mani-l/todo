export class TodoCreateDto{
    id:number;
    tittle:string;
    task:string;
    task_creation_date:Date;
    last_date:Date;
    is_completed:boolean;
    is_deleted:boolean;
    user_id:number;
}