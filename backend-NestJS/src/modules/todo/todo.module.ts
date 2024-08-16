import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service'
import { TodoController } from './todo.controller';


@Module({
    imports: [SequelizeModule.forFeature([Todo])],
    providers: [TodoService],
    controllers: [TodoController],
    exports: [TodoService],
  })
  export class TodoModule {}