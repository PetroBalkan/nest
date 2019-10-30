import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Todo } from './todo.model';
import { TodoDto } from './dto/todo.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TodoService {
    constructor(@InjectModel('todo') private readonly todoModel: Model<Todo>) {
    }

    public async create(articleDto: TodoDto): Promise<Todo> {
        return new this.todoModel(articleDto).save();
    }

    public async findAll(): Promise<Todo[]> {
        try {
            return this.todoModel.find().exec();
        } catch (e) {
        }
    }

    public async find(id: string): Promise<Todo> {
        try {
            return this.todoModel.findById(id).exec();
        } catch (e) {
        }
    }
}
