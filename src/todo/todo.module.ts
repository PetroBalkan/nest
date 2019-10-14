import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSchema } from './schemas/todo.schema';

@Module({
  controllers: [TodoController],
  imports: [MongooseModule.forFeature([{ name: 'todo', schema: TodoSchema }])],
  providers: [TodoService],
})
export class TodoModule {
}
