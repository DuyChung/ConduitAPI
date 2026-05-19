import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ArticlesModule } from './articles/articles.module';
import configuration from './config/configuration';
import { ProfilesModule } from './profiles/profiles.module';
import { CommentsModule } from './comments/comments.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: `src/config/env/.env.${process.env.NODE_ENV || 'development'}`,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),

    AuthModule,

    ArticlesModule,
    ProfilesModule,
    CommentsModule,
    TagsModule,
  ],
})
export class AppModule {}
