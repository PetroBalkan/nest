import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TodoModule,
    MongooseModule.forRoot('mongodb://balkanss:petya777@ds125273.mlab.com:25273/web-chat'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
