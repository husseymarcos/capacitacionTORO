import { Injectable } from '@nestjs/common';
import { Todo } from './todo.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TodoService {
    constructor(@InjectModel(Todo) private todoRepository: typeof Todo) {}
}