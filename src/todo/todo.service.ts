import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Todo } from './todo.model';
import { TodoDto } from './dto/todo.dto';

@Injectable()
export class TodoService {
  constructor(@Inject('TODO_MODEL') private readonly todoModel: Model<Todo>) {
  }
 public async create(articleDto: TodoDto): Promise<Todo> {
    return new this.todoModel(articleDto).save();
  }

  public async findAll(): Promise<Todo[]> {
    try {
      return this.todoModel.find().exec();
    } catch (e) {
      console.log(e);
    }
  }
}
