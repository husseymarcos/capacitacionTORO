import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service'


@Module({
    imports: [SequelizeModule.forFeature([Todo])],
    providers: [TodoService],
    exports: [TodoService, SequelizeModule],
  })
  export class TodoModule {}