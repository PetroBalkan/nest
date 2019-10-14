import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect('mongodb://balkanss:petya777@ds125273.mlab.com:25273/web-chat', { useNewUrlParser: true, useFindAndModify: false }),
  },
];
