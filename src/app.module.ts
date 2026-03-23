import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'conduit',
      autoLoadEntities: true,
      synchronize: true, 
    }),

    UserModule,
  ],
})
export class AppModule {}
