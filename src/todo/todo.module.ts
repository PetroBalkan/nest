import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { DatabaseModule } from '../database/database.module';
import { todoProviders } from './todo.providers';

@Module({
  controllers: [TodoController],
  imports: [DatabaseModule],
  providers: [TodoService, ...todoProviders],
})
export class TodoModule {
}
