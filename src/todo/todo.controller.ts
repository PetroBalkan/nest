import { Body, Controller, Get, Post } from '@nestjs/common';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';
import { TodoDto } from './dto/todo.dto';

@Controller('todo')
export class TodoController {

  constructor(private readonly todoService: TodoService) {
  }

  @Post()
  async create(@Body() todoDto: TodoDto) {
    return this.todoService.create(todoDto);
  }

  @Get()
  public async getTodos(): Promise<Todo[]> {
    return this.todoService.findAll();
  }
}
