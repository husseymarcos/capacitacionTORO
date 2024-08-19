import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo) private readonly todoModel: typeof Todo) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoModel.create(createTodoDto);
  }

  async findByUser(userId: number): Promise<Todo[]> {
    return this.todoModel.findAll({
      where: { userId },
    });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo | null> {
    const [numberOfAffectedRows] = await this.todoModel.update(updateTodoDto, {
      where: { id },
    });

    if (numberOfAffectedRows > 0) {
      return this.todoModel.findByPk(id);
    } else {
      return null;
    }
  }

  async delete(id: number): Promise<void> {
    const numberOfDeletedRows = await this.todoModel.destroy({
      where: { id },
    });

    if (numberOfDeletedRows === 0) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
  }
}
