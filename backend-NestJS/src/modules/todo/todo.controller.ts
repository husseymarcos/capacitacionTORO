import { Controller, Post, Body } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';
import { Public } from '../auth/auth.controller';

@Controller('api/todo')
export class TodoController {

    constructor(private readonly todoService: TodoService){}

    @Public()
    @Post('/create') 
    async createTodo(@Body() createTodoDto: CreateTodoDto,): Promise<Todo> {
        return this.todoService.create(createTodoDto);
    }

}
