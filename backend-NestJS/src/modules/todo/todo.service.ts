import { Injectable } from '@nestjs/common';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {

  constructor(@InjectModel(Todo) private readonly todoModel: typeof Todo) {}

    async create(createTodoDto: CreateTodoDto): Promise<Todo> {
      return this.todoModel.create({
        title: createTodoDto.title,
        description: createTodoDto.description,
        completed: createTodoDto.completed ?? false,
        dueDate: createTodoDto.dueDate,
        userId: createTodoDto.userId,
    });
      }


    async findByUser(userId: number): Promise<Todo[]> {
      return this.todoModel.findAll({
            where: { userId }
        });
    }


    async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
      const todo = await this.todoModel.findByPk(id);
      return todo.update(updateTodoDto);
  }

  async delete(id: number): Promise<void> {
      this.todoModel.destroy({
          where: { id }
      });
  }

    
}