import { PartialType } from "@nestjs/mapped-types";
import { TodoCreateDto } from "./createtodo.dto";

export class TodoUpateDto extends PartialType(TodoCreateDto){}