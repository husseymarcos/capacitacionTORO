import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';
import { Public } from '../auth/auth.controller';

@Controller('api/todos')
export class TodoController {

    constructor(private readonly todoService: TodoService){}

    @Public()
    @Post('/create') 
    async createTodo(@Body() createTodoDto: CreateTodoDto,): Promise<Todo> {
        return await this.todoService.create(createTodoDto);
    }

}
