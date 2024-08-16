import { Injectable } from '@nestjs/common';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodoService {

    async create(createTodoDto: CreateTodoDto): Promise<Todo> {
        
        const todo = new Todo({
          title: createTodoDto.title,
          description: createTodoDto.description,
          completed: createTodoDto.completed ?? false,
          dueDate: createTodoDto.dueDate,
          userId: createTodoDto.userId,
        });
    
        return todo.save();
      }

    
}