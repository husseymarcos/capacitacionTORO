import { Controller, Post, Body, Get, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';
import { Public } from '../auth/auth.controller';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('api/todos')
export class TodoController {

    constructor(private readonly todoService: TodoService){}

    @Post('/create') 
    async createTodo(@Body() createTodoDto: CreateTodoDto,): Promise<Todo> {
        return await this.todoService.create(createTodoDto);
    }

    @Get('/:userId')
    async getTodosByUser(@Param('userId') userId: number): Promise<Todo[]> {
        return await this.todoService.findByUser(userId);
    }

    @Put('/:id')
    async updateTodo(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto): Promise<Todo> {
        return await this.todoService.update(id, updateTodoDto);
    }


    @Delete('/:id')
    async deleteTodo(@Param('id') id: number): Promise<void> {
        await this.todoService.delete(id);
    }

}
